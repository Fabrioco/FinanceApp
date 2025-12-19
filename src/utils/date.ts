export function isSameMonth(date: Date | string, base: Date) {
  const d = typeof date === "string" ? new Date(date) : date;

  return (
    d.getMonth() === base.getMonth() && d.getFullYear() === base.getFullYear()
  );
}

export function formatDateLabel(date: string) {
  const d = new Date(date);
  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "Hoje";
  if (d.toDateString() === yesterday.toDateString()) return "Ontem";

  return d.toLocaleDateString("pt-BR");
}

export function formatMonthYear(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
}
