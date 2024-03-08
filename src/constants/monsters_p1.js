const monsters_p1 = [
    {
        name : 'm1',
        hp : 100,
        id : '0',
        owner : 'p1',
        ability : [{
            name  : 'Swipe',
            dmg : 10,
            type : 'atk'
        }, 
        {
            name : 'Cut',
            dmg : 15,
            type : 'atk'
        }]
    },
    {
        name : 'm2',
        hp : 80,
        id : '1',
        owner : 'p1',
        ability : [{
            name  : 'Bite',
            dmg : 10,
            type : 'atk'
        }]
    },
    {
        name : 'm3',
        hp : 150, 
        id : '2',
        owner : 'p1',
        ability : [{
            name  : 'Heal',
            dmg : 5,
            type : 'spt'
        }]
    }
]

export default monsters_p1
