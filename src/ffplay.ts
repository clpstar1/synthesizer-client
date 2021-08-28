import { spawn, ChildProcess } from 'child_process'
import { Readable } from 'stream'

export function play_audio(buffer: Buffer) {

    console.log('spawning ...')

    const cp = spawn(
        'ffplay', 
        [
            '-i',
            '-',
            '-f',
            'f32le',
            '-ar',
            '48000',
            '-nodisp'
        ]
    )

    cp.stderr.on('data', (data) => {
        console.log(data.toString())
    })

    cp.stdin.on('error', (data) => {
        console.log(data.toString())
    })

    stream_data(cp, buffer)
}

function stream_data(ffplay: ChildProcess, buffer: Buffer){

    const reader = Readable.from(buffer)
    reader.pipe(ffplay.stdin, { end:false} )
    reader.on('end', () => {
        stream_data(ffplay, buffer)
    })

}