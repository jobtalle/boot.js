/**
 * Boot up
 * @param {Bootable} bootable The bootable
 * @param {number} fps The number of updates per second
 */
export function boot(bootable, fps) {
    const updateRate = 1 / fps;
    let lastTime = performance.now();
    let updateTime = 0;

    const loop = time => {
        const elapsedTime = Math.max(10, time - lastTime);

        updateTime += .001 * elapsedTime;

        if (updateTime > updateRate) {
            bootable.update(updateRate);

            updateTime -= updateRate * Math.trunc(updateTime / updateRate);
        }

        lastTime = time;

        bootable.render(updateTime / updateRate, .001 * elapsedTime);

        requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
}