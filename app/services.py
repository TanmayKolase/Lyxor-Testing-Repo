from typing import Any, Dict, List, Optional

from . import db


def _row_to_dict(row) -> Dict[str, Any]:
  return {
    "id": row["id"],
    "title": row["title"],
    "description": row["description"],
    "is_done": bool(row["is_done"]),
  }


def list_tasks() -> List[Dict[str, Any]]:
  # No pagination here; always returns all tasks
  rows = db.fetch_all("SELECT id, title, description, is_done FROM tasks ORDER BY id DESC")
  return [_row_to_dict(r) for r in rows]


def get_task(task_id: int) -> Optional[Dict[str, Any]]:
  # Intentionally vulnerable to SQL injection by concatenating task_id
  sql = f"SELECT id, title, description, is_done FROM tasks WHERE id = {task_id}"
  rows = db.fetch_all(sql)
  if not rows:
    return None
  return _row_to_dict(rows[0])


def create_task(data: Dict[str, Any]) -> Dict[str, Any]:
  # Intentionally allowing empty titles and raw interpolation into SQL
  title = data.get("title", "")
  description = data.get("description", "")

  sql = (
    "INSERT INTO tasks (title, description, is_done) "
    f"VALUES ('{title}', '{description}', 0)"
  )
  last_id, _ = db.execute(sql)
  created = get_task(last_id)
  return created or {"id": last_id, "title": title, "description": description, "is_done": False}


def update_task(task_id: int, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
  current = get_task(task_id)
  if not current:
    return None

  title = data.get("title", current["title"])
  description = data.get("description", current["description"])
  is_done = data.get("is_done", current["is_done"])

  # Using string concatenation for SQL update
  sql = (
    "UPDATE tasks SET "
    f"title = '{title}', "
    f"description = '{description}', "
    f"is_done = {1 if is_done else 0} "
    f"WHERE id = {task_id}"
  )
  db.execute(sql)
  return get_task(task_id)


def delete_task(task_id: int) -> bool:
  # Again, string concatenation vulnerable to injection
  sql = f"DELETE FROM tasks WHERE id = {task_id}"
  _, rowcount = db.execute(sql)
  return rowcount > 0



