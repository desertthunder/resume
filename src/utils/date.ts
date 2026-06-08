export function formatResumeDate(date?: string): string {
  if (!date) return "Present";

  const [year, month] = date.split("-");

  if (!year) return date;
  if (!month) return year;

  const monthIndex = Number(month) - 1;
  if (Number.isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return date;

  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(
    new Date(Number(year), monthIndex, 1),
  );
}

export function formatResumeDateRange(startDate?: string, endDate?: string): string {
  return `${formatResumeDate(startDate)} – ${formatResumeDate(endDate)}`;
}
