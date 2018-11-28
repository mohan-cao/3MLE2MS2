import Tone from 'tone'

/**
* @fileoverview A sample library and quick-loader for tone.js
* 
* @author N.P. Brosowsky (nbrosowsky@gmail.com)
* https://github.com/nbrosowsky/tonejs-instruments
*/

export const defaultInstrument = 'piano'
const GENERATED_SOUNDS = {
    'A0': 'A1.[mp3|ogg]',
    'A1': 'A2.[mp3|ogg]',
    'A2': 'A3.[mp3|ogg]',
    'A3': 'A4.[mp3|ogg]',
    'A4': 'A5.[mp3|ogg]',
    'A5': 'A6.[mp3|ogg]',
    'A6': 'A7.[mp3|ogg]',
    'Ab0': 'Ab1.[mp3|ogg]',
    'Ab1': 'Ab2.[mp3|ogg]',
    'Ab2': 'Ab3.[mp3|ogg]',
    'Ab3': 'Ab4.[mp3|ogg]',
    'Ab4': 'Ab5.[mp3|ogg]',
    'Ab5': 'Ab6.[mp3|ogg]',
    'Ab6': 'Ab7.[mp3|ogg]',
    'B0': 'B1.[mp3|ogg]',
    'B1': 'B2.[mp3|ogg]',
    'B2': 'B3.[mp3|ogg]',
    'B3': 'B4.[mp3|ogg]',
    'B4': 'B5.[mp3|ogg]',
    'B5': 'B6.[mp3|ogg]',
    'B6': 'B7.[mp3|ogg]',
    'Bb0': 'Bb1.[mp3|ogg]',
    'Bb1': 'Bb2.[mp3|ogg]',
    'Bb2': 'Bb3.[mp3|ogg]',
    'Bb3': 'Bb4.[mp3|ogg]',
    'Bb4': 'Bb5.[mp3|ogg]',
    'Bb5': 'Bb6.[mp3|ogg]',
    'Bb6': 'Bb7.[mp3|ogg]',
    'C0': 'C1.[mp3|ogg]',
    'C1': 'C2.[mp3|ogg]',
    'C2': 'C3.[mp3|ogg]',
    'C3': 'C4.[mp3|ogg]',
    'C4': 'C5.[mp3|ogg]',
    'C5': 'C6.[mp3|ogg]',
    'C6': 'C7.[mp3|ogg]',
    'C7': 'C7.[mp3|ogg]',
    'D0': 'D1.[mp3|ogg]',
    'D1': 'D2.[mp3|ogg]',
    'D2': 'D3.[mp3|ogg]',
    'D3': 'D4.[mp3|ogg]',
    'D4': 'D5.[mp3|ogg]',
    'D5': 'D6.[mp3|ogg]',
    'D6': 'D6.[mp3|ogg]',
    'Db0': 'Db1.[mp3|ogg]',
    'Db1': 'Db2.[mp3|ogg]',
    'Db2': 'Db3.[mp3|ogg]',
    'Db3': 'Db4.[mp3|ogg]',
    'Db4': 'Db5.[mp3|ogg]',
    'Db5': 'Db6.[mp3|ogg]',
    'Db6': 'Db7.[mp3|ogg]',
    'E0': 'E1.[mp3|ogg]',
    'E1': 'E2.[mp3|ogg]',
    'E2': 'E3.[mp3|ogg]',
    'E3': 'E4.[mp3|ogg]',
    'E4': 'E5.[mp3|ogg]',
    'E5': 'E6.[mp3|ogg]',
    'E6': 'E7.[mp3|ogg]',
    'Eb0': 'Eb1.[mp3|ogg]',
    'Eb1': 'Eb2.[mp3|ogg]',
    'Eb2': 'Eb3.[mp3|ogg]',
    'Eb3': 'Eb4.[mp3|ogg]',
    'Eb4': 'Eb5.[mp3|ogg]',
    'Eb5': 'Eb6.[mp3|ogg]',
    'Eb6': 'Eb7.[mp3|ogg]',
    'F0': 'F1.[mp3|ogg]',
    'F1': 'F2.[mp3|ogg]',
    'F2': 'F3.[mp3|ogg]',
    'F3': 'F4.[mp3|ogg]',
    'F4': 'F5.[mp3|ogg]',
    'F5': 'F6.[mp3|ogg]',
    'F6': 'F7.[mp3|ogg]',
    'G0': 'G1.[mp3|ogg]',
    'G1': 'G2.[mp3|ogg]',
    'G2': 'G3.[mp3|ogg]',
    'G3': 'G4.[mp3|ogg]',
    'G4': 'G5.[mp3|ogg]',
    'G5': 'G6.[mp3|ogg]',
    'G6': 'G7.[mp3|ogg]',
    'Gb0': 'Gb1.[mp3|ogg]',
    'Gb1': 'Gb2.[mp3|ogg]',
    'Gb2': 'Gb3.[mp3|ogg]',
    'Gb3': 'Gb4.[mp3|ogg]',
    'Gb4': 'Gb5.[mp3|ogg]',
    'Gb5': 'Gb6.[mp3|ogg]',
    'Gb6': 'Gb7.[mp3|ogg]'
}

let SampleLibrary = {
    minify: false,
    ext: '.[mp3|ogg]', // use setExt to change the extensions on all files // do not change this variable //
    baseUrl: 'https://raw.githubusercontent.com/mohan-cao/3MLE2MS2-soundfonts/master/',
    list: [
        'piano', 'electric-piano', 'harpsichord', 'harp',
        'guitar', 'electric-guitar', 'acoustic-bass', 'electric-bass',
        'violin', 'pizzicato-strings', 'cello',
        'clarinet', 'oboe', 'ocarina', 'pan-flute', 'saxophone',
        'trombone', 'trumpet',
        'harmonica', 'steel-drums', 'timpani', 'tom-tom', 'vibraphone', 'xylophone'
    ],

    setExt: function (newExt) {
        var i
        for (i = 0; i <= this.list.length - 1; i++) {
            for (var property in this[this.list[i]]) {

                this[this.list[i]][property] = this[this.list[i]][property].replace(this.ext, newExt)
            }


        }
        this.ext = newExt;
        return console.log("sample extensions set to " + this.ext)
    },

    load: async function (arg) {
        var t, rt, i;
        (arg) ? t = arg: t = {};
        t.instruments = t.instruments || this.list;
        t.baseUrl = t.baseUrl || this.baseUrl;

        // update extensions if arg given
        if (t.ext) {
            if (t.ext !== this.ext) {
                this.setExt(t.ext)
            }
            t.ext = this.ext
        }

        rt = {};

        // if an array of instruments is passed...
        if (Array.isArray(t.instruments)) {
            const newLocal = function (_, i) {
                return i % minBy !== 0;
            };
            const newLocal_1 = function (f) {
                delete newT[f];
            };
            const promise = (rt, t, newT) => {
                return new Promise((resolve, reject) => {
                    try {
                        rt[t.instruments[i]] = new Tone.Sampler(
                            newT, {
                                baseUrl: t.baseUrl + t.instruments[i] + "/",
                                'release' : 1,
                                'onload' : resolve
                            }
                        )
                    } catch (e) { reject(e) }
                })
            }
            for (i = 0; i <= t.instruments.length - 1; i++) {
                var newT = (this.list.indexOf(t.instruments[i] !== -1) ? GENERATED_SOUNDS : this[t.instruments[i]]);
                //Minimize the number of samples to load
                if (this.minify === true || t.minify === true) {
                    var minBy = 1;
                    if (Object.keys(newT).length >= 17) {
                        minBy = 2
                    }
                    if (Object.keys(newT).length >= 33) {
                        minBy = 4
                    }
                    if (Object.keys(newT).length >= 49) {
                        minBy = 6
                    }

                    
                    var filtered = Object.keys(newT).filter(newLocal)
                    
                    filtered.forEach(newLocal_1)

                }
                await promise(rt, t, newT)
            }

            return rt

            // if a single instrument name is passed...
        } else {
            newT = (this.list.indexOf(t.instruments[i] !== -1) ? GENERATED_SOUNDS : this[t.instruments]);

            //Minimize the number of samples to load
            if (this.minify === true || t.minify === true) {
                minBy = 1;
                if (Object.keys(newT).length >= 17) {
                    minBy = 2
                }
                if (Object.keys(newT).length >= 33) {
                    minBy = 4
                }
                if (Object.keys(newT).length >= 49) {
                    minBy = 6
                }

                filtered = Object.keys(newT).filter(function (_, i) {
                    return i % minBy !== 0;
                })
                filtered.forEach(function (f) {
                    delete newT[f]
                })
            }



            var s;
            const promise = () => {
                return new Promise((resolve, reject) => {
                    try {
                        s = new Tone.Sampler(
                            newT, {
                                baseUrl: t.baseUrl + t.instruments + "/",
                                'release' : 1,
                                'onload' : resolve
                            }
                        )
                    } catch (e) { reject(e) }
                })
            }
            await promise()

            return s
        }

    },
    // CUSTOM INSTRUMENTS HERE
}
export default SampleLibrary;