import { EventObject, assign, createMachine } from 'xstate';

export const enemyMachine = createMachine({
  /** @xstate-layout -EIiYtFSCLIKymqa2roGSsamCBoA7GzYlubmWq5FznJK0h5eaFh4RKTkFPRMAKIA+gAiVACyVADinZHisSTCouJJKhoKbBrmuqpabGzSlgW5iE4a2OZKBXKbbAXHZdv14I2+LQEUAErh3VQA6lQAmuPRk9MJUBJFKKVTqLQ6fRGEwyIqgmoaNhKDZyHRKG7eJqEQSCQi4ADWjwAYgBJMIkwIACTedEYrE4EwEU3is0QpWK5gKVUs0iclmcGl2CDkW0U0nF8lqllcNTqnluPmw2NxBOJZIp1No9GYLHMUV4TIBrOS8lB6QhWWheT0ooKei5pw0zhUSJUGLuSpxeMJbQksFxgjASoAZoGAE4ACmcbAAlBRMThld6Ar8DXEZolEFy9Ng9JZCipzPanY6hXICuZsJolPp+S6Cho7Bp3Yr-QBXFBoCDPToMADyADVOk9UzFDSzMwgCspsPJzJkeUWjnIy4XsIU5KUdPzeYW9C2mu3O5AKH6A0HCKGwJHzBtY-GPUeu6P-hOgVnjoc5BpCzWNrZaiFH8Dn0G0NAWcUi3AuUGkVXF8TAXpCHQQgYAoYJwhfccM3fBB5kWZZVnmWRNm2IUXRUbACnmWokT0J07AKA8cHgxDkNQsAKF6EkxgZP5sMBSQ9gWWdCJqYiNi2HYYQQVQbCdXkeWOVEuWY7BWKQlC0IYSkqECXj9THdNBLmESlhWcT1lI6S8g0TRFGLecKOkAo7H3eUE3UwgEM0jjT39bELyvSNozjTyNPYmAsOM418NEiy1hIqSgK0Gw2CLZE800FRXLUsMO0IAB3QhMHQmg+wABW6F4wjeT4fj4tNmRwoSpxcMVLCcZS2DUFcZN5Yo1BWJQ9HteinHc+UUD4CA4HEBNGRiycAFppCFZac2lLbtp25sPI9PxWigRbmpMxBIRsSxjiKQs7WcPQUoKeFpDzeY2BtTc1KTVVyBOo1Jyu4plBqLkrvzJYVCFAwc3KdLo35HrCzUp9ID+t9WsB+FrrBxEfyApwbGOF6LBG6irDUiKtLANGWqSHQhSUJRcz0JQynMexlGkcC8oK4q8ia-7cMx4HsaUcG8f69QqLFonWdcdQ1NmwgIBps7hTKKjyj0b9ticTc+ryVnsHLUoK3KOy8ydDwPCAA */
  predictableActionArguments: true,
  id: 'enemy',
  initial: 'walk',
  context: {
    initialHP: 100,
    currentHP: 100,
    playerIsReachable: true,
  },
  states: {
    walk: {
      on: {
        ATTACK: 'attacking',
        STUN: 'stunned',
        TAKE_DAMAGE: 'takeDamage',
        RUN_AWAY: 'runaway',
      },
    },
    attacking: {
      on: {
        FINISH_ATTACK: [
          {
            target: 'attacking',
            cond: (context: { playerIsReachable: boolean }) => !context.playerIsReachable,
          },
          {
            target: 'walk',
            cond: (context: { playerIsReachable: boolean }) => context.playerIsReachable,
          },
        ],
      },
      after: {
        500: 'walk',
      },
    },
    stunned: {
      on: {
        RECOVER: 'walk',
      },
      after: {
        1000: 'walk',
      },
    },
    takeDamage: {
      entry: assign({ currentHP: (context: { currentHP: number }) => context.currentHP - 20 }),
      on: {
        STUN: 'stunned',
        DIE: 'dead',
        CHASE: 'walk',
      },
      after: {
        500: 'walk',
      },
    },
    runaway: {
      on: {
        STOP_RUN_AWAY: 'walk',
      },
    },
    dead: {
      type: 'final',
    },
  },
  on: {
    PLAYER_REACHABLE_CHANGE: {
      actions: assign((context, event: EventObject & { reachable: boolean }) => ({
        ...context,
        playerIsReachable: event.reachable,
      })),
    },
  },
  // @ts-ignore
  actions: {
    reduceHP: assign({
      currentHP: (context: { currentHP: number }) => context.currentHP - 1,
    }),
  },
});

