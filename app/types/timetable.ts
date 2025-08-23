import type { SubjectType } from '~/types/subject';

export type TimetableType = Array<
	[
		SubjectType | string | undefined | null,
		SubjectType | string | undefined | null,
		SubjectType | string | undefined | null,
		SubjectType | string | undefined | null,
		SubjectType | string | undefined | null,
	]
>;
