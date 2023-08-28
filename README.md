# bomberman

Coding competition

## Gameplay

Game is made in the PvP arcade maze genre.
The players spawn in a labyrinth of walls, they move around the map and leave bombs
that explode after the countdown and kill other players.
The player who left the bomb that kill another player gets points.
The players respawn in an empty space after death.
The goal is to earn the most points.

## Setting

- **Map** - coordinate system consists of cells, X - horizontal axis, Y - vertical axis, Origin - top left corner.
- **Cell** - square with coordinates [x,y].
  Contains one of the following game objects at same time:
    - **Space** - empty place.
    - **Wall** - unbreakable barrier.
    - **Fire** - kills players and explodes other bombs in a **chain**.
    - **Bomb** - explodes with fire that spreads perpendicular equidistantly for a certain **distance**.
    - **Player** - moves around the map and places bombs.

      OR contains multiple game objects at same time:
    - **Players**
    - **Bomb AND Players**

### Game objects:

| Name   | Character | Unicode       |
|--------|-----------|---------------|
| Space  |           | U+0020        |
| Wall   | #         | U+0023        |
| Fire   | *         | U+002A        |
| Bomb   | @         | U+0040        |
| Player | A-Z       | U+0041-U+005A |

### Player actions:

| Name  | Character | Unicode       |
|-------|-----------|---------------|
| Stand |           | U+0020        |
| Left  | L         | U+004C        |
| Right | R         | U+0052        |
| Up    | U         | U+0055        |
| Down  | D         | U+0044        |
| Bomb  | @         | U+0040        |
| Time  | 1-9       | U+0031-U+0039 |
| Power | 1-9       | U+0031-U+0039 |

Bomb by default has time = 3, power = 2.
You can set time and power, but not just one.

### State machine

|           | Space      | Wall    | Fire          | Bomb     | Player(s)  | Bomb and Player(s) |
|-----------|------------|---------|---------------|----------|------------|--------------------|
| Space     | nothing    | nothing | go out        | error    | error      | error              |
| Wall      | error      | error   | error         | error    | error      | error              |
| Fire      | fire       | nothing | previous fire | explodes | kill       | explodes and kill  |
| Bomb      | error      | error   | error         | error    | plant      | nothing            |
| Player(s) | add player | nothing | nothing       | nothing  | add player | error              |

## Mechanics

Game is synchronous. Time is divided into intervals by ticks.
Game objects act simultaneously, actions last interval, start and end in tick.
Rendering happens in tick, but animation lasts interval.
Server is counting the time and polling clients player's action every interval.
Clients are waiting for a request from the server and respond with action.
Therefore, in order to play, each client must:

```
Create a REST endpoint that takes a request body, calculates the next action, and returns a response body.
```

### REST endpoint

```curl
curl --location 'http://localhost:8080' \
--header 'Content-Type: application/json' \
--data-raw '
{
  "x": 1,
  "y": 1,
  "map": [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "A", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", "#", " ", "#", " ", "#", " ", "#"],
    ["#", "@", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", "#", " ", "#", " ", "#", " ", "#"],
    ["#", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", "#", " ", "#", " ", "#", " ", "#"],
    ["#", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"]
  ],
  "players": [
    {
      "name": "A",
      "x": 1,
      "y": 1,
      "isAlive": true,
      "score": 0
    }
  ],
  "bombs": [
    {
      "x": 1,
      "y": 4,
      "countdown": 3,
      "power": 2
    }
  ]
}'
```

### Response body

```
@21
```

### Examples

**Left**

```
####    ####
# A#    #A #
#  #    #  #
####    ####
```

**Right**

```
####    ####
#A #    # A#
#  #    #  #
####    ####
```

**Up**

```
####    ####
#  #    #A #
#A #    #  #
####    ####
```

**Down**

```
####    ####
#A #    #  #
#  #    #A #
####    ####
```

**Bomb with power 2 explodes**

```
#######       #######
#     #       #     #
#     #       #  *  #
#  @  #       # *** #
#     #       #  *  #
#     #       #     #
#######       #######
```

**Bomb with power 3 explodes**

```
#######       #######
#     #       #  *  #
#     #       #  *  #
#  @  #       #*****#
#     #       #  *  #
#     #       #  *  #
#######       #######
```

**Bomb with power 3 explodes bomb with power 2 in a chain**

```
#########     #########
#       #     #  *    #
# # # # #     # #*#*# #
#  @ @  #  >  #****** #
# # # # #     # #*#*# #
#       #     #  *    #
#########     #########
```

**Fire goes out**

```
#####     #####
# * #     #   #
#***#     #   #
# * #     #   #
#####     #####
```

**Bomb with power 4 explodes, fire is limited to walls**

```
#########         #########
#  #    #         #  #    #
#       #         #  *    #
# #@  # #         # #***# #
#       #         #  *    #
#       #         #  *    #
#       #         #  *    #
#       #         #       #
#########         #########
```
