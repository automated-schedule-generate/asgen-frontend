export type PreferenceType = {
    turn: 'matutino' | 'vespertino' | 'noturno',
    preference: (boolean | null)[][]
}[]