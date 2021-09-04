import range from 'lodash/range'
import { writeFileSync } from 'fs'
import { play_audio } from './ffplay'

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
        private waveFunction: WaveFunction,
        private buffer: Buffer
    ) { }

    /**
     * write the wave to the buffer supplied in the
     * class constructor
     * @param from the start of the wave
     * @param to the end of the wave, if not supplied implies that from should be used as to
     */
    writeWaveToBuffer(from: number, to: number = 0) {
        const steps = from - to
        const floatsize = 4
        const bytesNeeded = steps * floatsize

        if (this.buffer.byteLength < bytesNeeded){
            throw new Error('supplied buffer is too small')
        }

        for (const step of range(steps)){
            const val = this.waveFunction.waveAt(step / steps)
            this.buffer.writeFloatLE(val, step * floatsize)
        }
    }
}

function main(){
    
    const steps = 48000
    const bufsize = steps * 4
    const buf = Buffer.allocUnsafe(bufsize)

    const wave = new SineWave(0.1, 400)
    const waveBuilder = new WaveBuilder(wave, buf)

    waveBuilder.writeWaveToBuffer(steps)

    play_audio(buf)
}

main()