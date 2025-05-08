export type TimeDefaults = {
	morningOpen: string;
	morningClose: string;
	afternoonOpen: string;
	afternoonClose: string;
};

export type RowItem = {
	open: string;
	close: string;
	disabled: boolean | undefined;
};

export type Row = RowItem[] | null;

export type Rows = { [ day: number ]: Row };

export type View = 'today' | 'week' | undefined;
