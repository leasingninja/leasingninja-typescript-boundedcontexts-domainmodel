export function pmt(n: number, iInPercent: number, pv: number, fv: number, s: number) : number {
    const i = iInPercent / 100;

    if (i == 0) {
        return (-1 * pv - fv) / n;
    }

    return (i * (fv + pv * Math.pow(1 + i, n))) / ((1 + i * s) * (1 - Math.pow(1 + i, n)));
}
