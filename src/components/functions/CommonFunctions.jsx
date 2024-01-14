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

export function setDiscriminatorIndex(measurementName) {
    if(measurementName == '(TN-C, TN-S) Badanie ochrony przed porażeniem przez samoczynne wyłączenie') {
        return 0
    } else if (measurementName == '(TN-S) Badanie rezystancji izolacji obwodów'){
        return 1
    } else if (measurementName == '(TN-C) Badanie rezystancji izolacji obwodów'){
        return 2
    } else if (measurementName == 'Parametry zabezpieczeń różnicowoprądowych'){
        return 3
    } else if (measurementName == 'Badanie rezystywności gruntu'){
        return 4
    } else if (measurementName == 'Badanie ciągłości małych rezystancji'){
        return 5
    }
}