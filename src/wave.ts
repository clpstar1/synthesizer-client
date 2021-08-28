import _ from 'lodash'

interface WaveFunction {
    /**
     * returns the value of the wave function at a given time
     * @param time
     */
    waveAt(time: number): number
}

class SineWave implements WaveFunction{

    constructor(
        private amplitude: number,
        private frequency: number, 
        private phase: number
    ) {}

    waveAt(time: number): number {
        throw new Error("Method not implemented.");
    }
}

class SquareWave implements WaveFunction {

    waveAt(time: number): number {
        throw new Error("Method not implemented.");
    }
    
}


class WaveBuilder {

    constructor (
        private waveFunction: WaveFunction
    ) {}
    
    /**
     * build a wave in a given timeframe
     * @param from the start of the wave
     * @param to the end of the wave
     */
    getWave(from: number, to: number){
        return range
    }
}