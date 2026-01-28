import sqlite3
from typing import Any, List, Tuple

from .config import DB_PATH


def get_connection() -> sqlite3.Connection:
  # Using sqlite3 directly in a blocking way from async endpoints
  conn = sqlite3.connect(DB_PATH)
  conn.row_factory = sqlite3.Row
  return conn


def init_db() -> None:
  conn = get_connection()
  try:
    conn.execute(
      """
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        is_done INTEGER NOT NULL DEFAULT 0
      )
      """
    )
    conn.commit()
  finally:
    conn.close()


def fetch_all(sql: str) -> List[sqlite3.Row]:
  # Intentionally taking raw SQL string, allowing SQL injection upstream
  conn = get_connection()
  try:
    cursor = conn.execute(sql)
    rows = cursor.fetchall()
    return rows
  finally:
    conn.close()


def execute(sql: str) -> Tuple[Any, int]:
  """
  Execute a mutation and return the cursor.lastrowid and rowcount.
  """
  conn = get_connection()
  try:
    cursor = conn.execute(sql)
    conn.commit()
    return cursor.lastrowid, cursor.rowcount
  finally:
    conn.close()



