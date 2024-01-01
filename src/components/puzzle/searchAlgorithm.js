class Node {
    constructor(parent = null, state = 0, cost_from_start = 0, cost_to_goal = 0) {
        this.parent = parent;
        this.state = state;
        this.cost_from_start = cost_from_start;
        this.cost_to_goal = cost_to_goal;
        this.children = [];
    }

    isEqual(other) {
        return this.state === other.state;
    }

    isLessThan(other) {
        return (this.cost_from_start + this.cost_to_goal) < (other.cost_from_start + other.cost_to_goal);
    }

    addChild(node, cost_to_expand = 1) {
        node.cost_from_start = this.cost_from_start + cost_to_expand;
        node.parent = this;
        this.children.push(node);
    }

    getFVal() {
        return this.cost_from_start + this.cost_to_goal;
    }

    traceback() {
        console.log(this.state);
        const num = [this.state];

        let p = this.parent;
        // let count = 1;

        while (p) {
            // count += 1;
            console.log(p.state);
            num.push(p.state);
            p = p.parent;
        }
        return num

        // console.log(`${count} nodes traced.\n`);
    }

    printState() {
        for (const row of this.state) {
            console.log(row);
        }
    }

    expand() {
        const [iZero, jZero] = findInSublists(0, this.state);
        const stateLen = this.state.length;
        const statesToReturn = [];

        if (iZero !== 0) {
            const tmpState = JSON.parse(JSON.stringify(this.state));
            tmpState[iZero][jZero] = tmpState[iZero - 1][jZero];
            tmpState[iZero - 1][jZero] = 0;

            if (this.parent && checkStatesEqual(tmpState, this.parent.state)) {
                statesToReturn.push(null);
            } else {
                statesToReturn.push(tmpState);
            }
        }

        if (jZero !== stateLen - 1) {
            const tmpState = JSON.parse(JSON.stringify(this.state));
            tmpState[iZero][jZero] = tmpState[iZero][jZero + 1];
            tmpState[iZero][jZero + 1] = 0;

            if (this.parent && checkStatesEqual(tmpState, this.parent.state)) {
                statesToReturn.push(null);
            } else {
                statesToReturn.push(tmpState);
            }
        }

        if (iZero !== stateLen - 1) {
            const tmpState = JSON.parse(JSON.stringify(this.state));
            tmpState[iZero][jZero] = tmpState[iZero + 1][jZero];
            tmpState[iZero + 1][jZero] = 0;

            if (this.parent && checkStatesEqual(tmpState, this.parent.state)) {
                statesToReturn.push(null);
            } else {
                statesToReturn.push(tmpState);
            }
        }

        if (jZero !== 0) {
            const tmpState = JSON.parse(JSON.stringify(this.state));
            tmpState[iZero][jZero] = tmpState[iZero][jZero - 1];
            tmpState[iZero][jZero - 1] = 0;

            if (this.parent && checkStatesEqual(tmpState, this.parent.state)) {
                statesToReturn.push(null);
            } else {
                statesToReturn.push(tmpState);
            }
        }

        return statesToReturn.filter(state => state !== null);
    }
}

function findInSublists(val, lst) {
    for (let i = 0; i < lst.length; i++) {
        const subList = lst[i];
        const j = subList.indexOf(val);
        if (j !== -1) {
            return [i, j];
        }
    }

    return [null, null];
}

function checkStatesEqual(stateA, stateB) {
    const flatListA = stateA.flat();
    const flatListB = stateB.flat();
    return JSON.stringify(flatListA) === JSON.stringify(flatListB);
}

function calcEuclideanDist(state, goal) {
    const allDist = [];

    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
            if (state[i][j] === goal[i][j]) {
                continue;
            }

            if (state[i][j] === 0) {
                continue;
            } else {
                const [iOfGoalTile, jOfGoalTile] = findInSublists(state[i][j], goal);
                const distance = Math.sqrt(Math.pow((i - iOfGoalTile), 2) + Math.pow(j - jOfGoalTile, 2));
                allDist.push(distance);
            }
        }
    }

    return allDist.reduce((sum, distance) => sum + distance, 0);
}

export function treeSearch(startState, goalState) {
    const root = new Node(null, startState);
    const h = [];
    h.push(root);
    const explored = [];

    let maxNodes = 1;
   
    while (h.length > 0) {
        maxNodes = Math.max(h.length, maxNodes);
        const current = h.shift();

        // current.printState();
        // console.log();

        if (checkStatesEqual(current.state, goalState)) {
            // console.log("traceback: ", current.traceback())

            return current.traceback();
        } else {
            explored.push(current);

            const expandedStatesList = current.expand().filter(nonNoneState => nonNoneState);

            if (expandedStatesList.length === 0) {
                continue;
            }

            for (const expandedState of expandedStatesList) {
                const newNode = new Node(null, expandedState);

                if ((h.some(node => node.isEqual(newNode)) || explored.some(node => node.isEqual(newNode)))) {
                    continue;
                }

                newNode.costToGoal = calcEuclideanDist(newNode.state, goalState);
                current.addChild(newNode);

                h.push(newNode);
            }

            
        }
    }
}

