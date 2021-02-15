export function calculateinterest(principal : number, years : number, interestrate : number) : number {
    return principal * (1 + interestrate) ** years;
}