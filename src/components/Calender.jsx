import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { useQuery } from "@tanstack/react-query";
import { getDashboardFn } from "../services/functions/getDashboardFn";
import SpinnerSm from "./../ui/SpinnerSm";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// const events = [
//   {
//     title: "Project Deadline",
//     start: new Date(2024, 7, 10),
//     end: new Date(2024, 7, 10),
//   },
//   {
//     title: "Task Deadline",
//     start: new Date(2024, 7, 15),
//     end: new Date(2024, 7, 15),
//   },
// ];

function Calender() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardFn,
  });

  if (isLoading) return <SpinnerSm />;

  const projectEvents = data?.projectDeadlines?.map((project) => ({
    title: project.title,
    start: new Date(project.deadline),
    end: new Date(project.deadline),
  }));

  const taskEvents = data?.taskDeadlines?.map((task) => ({
    title: task.title,
    start: new Date(task.deadline),
    end: new Date(task.deadline),
  }));

  const events = [...projectEvents, ...taskEvents];
  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  );
}

export default Calender;
