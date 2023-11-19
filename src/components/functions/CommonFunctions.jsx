export function handleContinuity(continuity) {
    if(continuity == 'PRESERVED') {
        return 'Zachowana'
    } else if (continuity == 'NOTPRESERVED') {
        return 'Niezachowana'
    }
}
export function handleResult(result) {
    if(result == 'NEGATIVE') {
        return 'Negatywna'
    } else if (result == 'POSITIVE') {
        return 'Pozytywna'
    }
}