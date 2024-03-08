class monster {
    constructor(hp, name, ability, id, owner) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.hp = hp;
        this.currHp = hp;
        this.ability = ability;
    }
}

export default monster