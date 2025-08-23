import type { TimetableType } from './timetable';

export type schoolClass = {
	id?: number;
	turn: 'matutino' | 'vespertino' | 'noturno';
	course_semester: number;
	course_id: number;
	semester_id: number | null;
	timetables: TimetableType[];
};
