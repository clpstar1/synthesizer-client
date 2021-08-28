import range from 'lodash/range'

interface WaveFunction {
    /**
     * returns the value of the wave function at a given time
     * @param time
     */
    waveAt(time: number): number
}

export class SineWave implements WaveFunction {

    constructor(
        private amplitude: number = 1,
        private frequency: number = 1,
        private phase: number = 0
    ) { }

    // https://en.wikipedia.org/wiki/Sine_wave
    waveAt(time: number): number {
        return this.amplitude * Math.sin(2 * Math.PI * this.frequency * time + this.degreeToRadians(this.phase))
    }

    // https://en.wikipedia.org/wiki/Radian
    private degreeToRadians(degree: number) {
        if (degree < 0) throw new Error(`degree is less than zero (${degree})`)
        return degree * (Math.PI / 180)
    }
}

class SquareWave implements WaveFunction {

    waveAt(time: number): number {
        throw new Error("Method not implemented.");
    }

}


export class WaveBuilder {

    constructor(
        private waveFunction: WaveFunction
    ) { }

    /**
     * build a wave in a given timeframe
     * @param from the start of the wave
     * @param to the end of the wave
     */
    getWave(from: number, to: number) {
        return range(from, to + 1).map(this.waveFunction.waveAt)
    }
}