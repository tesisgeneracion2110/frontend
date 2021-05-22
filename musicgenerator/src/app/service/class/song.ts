export class Song {
    constructor(
        public bpm: number,
        public root: string,
        public scale: string,
        public n_chords: number,
        public progression: number[],
        public n_beats: number,
        public structure: [[string, number]]
    ) {}
}
