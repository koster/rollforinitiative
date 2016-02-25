(function(main) {
    main.Config = {};

    main.Config.DefaultInitiative = 5;

    main.Config.PlayersData = [
        {
            name: 'Thurandil',
            initiative: 5,
            enemy: false
        },
        {
            name: 'Gilian',
            initiative: 6,
            enemy: false
        },
        {
            name: 'Targor',
            initiative: 1,
            enemy: false
        },
        {
            name: 'Brakzar',
            initiative: 3,
            enemy: false
        },
        {
            name: 'Enemy',
            initiative: main.DefaultInitiative,
            enemy: true
        }
    ]
})(window)