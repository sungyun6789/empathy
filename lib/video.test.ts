import * as Video from './video'

test('original youtube url test', () => {
    expect(Video.videoIdParser("https://www.youtube.com/watch?v=0KdNgiSLh7w")).toBe("0KdNgiSLh7w")
});

test('short youtube url test', () => {
    expect(Video.videoIdParser("https://youtu.be/0KdNgiSLh7w")).toBe("0KdNgiSLh7w")
});