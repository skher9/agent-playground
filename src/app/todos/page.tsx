'use client';

import { useSyncExternalStore, useState } from 'react';

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

const STORAGE_KEY = 'todos';
const EMPTY: Todo[] = [];

const listeners = new Set<() => void>();
let cache: { raw: string | null; todos: Todo[] } | null = null;

function parseTodos(raw: string | null): Todo[] {
  if (!raw) return EMPTY;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.filter(
      (item): item is Todo =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Todo).id === 'string' &&
        typeof (item as Todo).text === 'string' &&
        typeof (item as Todo).done === 'boolean',
    );
  } catch {
    return EMPTY;
  }
}

// Stable snapshots: React re-renders only when the snapshot reference changes.
function getSnapshot(): Todo[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (cache && cache.raw === raw) return cache.todos;
  const todos = parseTodos(raw);
  cache = { raw, todos };
  return todos;
}

function getServerSnapshot(): Todo[] {
  return EMPTY;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function storeTodos(next: Todo[]) {
  const raw = JSON.stringify(next);
  localStorage.setItem(STORAGE_KEY, raw);
  cache = { raw, todos: next };
  listeners.forEach((listener) => listener());
}

export default function TodosPage() {
  const todos = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [text, setText] = useState('');

  function addTodo() {
    const trimmed = text.trim();
    if (!trimmed) return;
    storeTodos([
      ...getSnapshot(),
      { id: crypto.randomUUID(), text: trimmed, done: false },
    ]);
    setText('');
  }

  function toggleTodo(id: string) {
    storeTodos(
      getSnapshot().map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function deleteTodo(id: string) {
    storeTodos(getSnapshot().filter((todo) => todo.id !== id));
  }

  const remaining = todos.filter((todo) => !todo.done).length;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Todos</h1>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What needs to be done?"
          className="rounded border border-gray-300 px-3 py-2"
        />
        <button
          type="button"
          onClick={addTodo}
          className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <p className="mt-4">{remaining} left</p>

      {todos.length === 0 ? (
        <p className="mt-2 text-gray-500">Nothing to do</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                aria-label={todo.text}
              />
              <span className={todo.done ? 'line-through' : ''}>
                {todo.text}
              </span>
              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
                className="rounded border border-gray-300 px-2 py-1 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
