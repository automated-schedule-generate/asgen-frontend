import type { TimetableType } from '~/types/timetable';
import type { SubjectType } from './subject';
import type { SchoolClassType } from './schollClass';

type CourseType = {
	id?: number;
	name: string;
	total_semesters: number;
	subjects?: SubjectType[];
	timetables?: TimetableType[];
	classes?: SchoolClassType[];
};

export type { CourseType };
