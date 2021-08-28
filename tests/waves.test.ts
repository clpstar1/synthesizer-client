import { expect } from 'chai'
import { zip } from 'lodash'
import { SineWave } from '../src/wave'

function expectWithErrorMargin(is: number, expected: number, errorMargin: number) {
    return expect(Math.abs(is - expected)).to.be.lt(errorMargin)
}

function checkSineWave(wave: SineWave, points: Point [], errorMargin: number = 0.00000001){
    points
        .map(p => Point.new(wave.waveAt(p.x), p.y))
        .forEach(p => expectWithErrorMargin(p.x, p.y, errorMargin))
}

class Point {
    constructor(
        public x: number,
        public y: number
    ) {}

    static new(x: number, y: number){
        return new Point(x, y)
    }
}

describe('waves', () => {

    describe('sinewave', () => {
        
        
        let defaultPoints = [
            Point.new(0, 0),
            Point.new(0.25, 1),
            Point.new(0.5, 0),
            Point.new(0.75, -1),
            Point.new(1, 0),
        ]
        
        it('check default wave (1 osc per second)', () => {
            
            const wave = new SineWave()
            // for each point check if the calculated x value equals the expected y value
            checkSineWave(wave, defaultPoints)
            
        })

        it('check half frequency wave (0.5 osc per second)', () => {
            const wave = new SineWave(1, 0.5)
            // half the frequency = double the x values (wave gets longer)
            const points = defaultPoints.map(p => Point.new(p.x * 2, p.y))
            checkSineWave(wave, points)
        })

        it('check half amplitude', () => {
            const wave = new SineWave(0.5, 1)
            // half the amplitude = divide y values by 2
            const points = defaultPoints.map(p => Point.new(p.x, p.y / 2))
            checkSineWave(wave, points)
        })

        it('check phase shift', () => {
            
            const wave = new SineWave(1, 1, 90)
            // phase shift by 90 degree = start from maximum
            const pointsShifted = [
                Point.new(0, 1),
                Point.new(0.25, 0),
                Point.new(0.5, -1),
                Point.new(0.75, 0),
                Point.new(1, 1),
            ]
            checkSineWave(wave, pointsShifted)
        })
    })
})