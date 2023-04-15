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
| Bomb   | 1-9       | U+0031-U+0039 |
| Player | A-Z       | U+0041-U+005A |

### Player actions:

| Name  | Character | Unicode       |
|-------|-----------|---------------|
| Stand |           | U+0020        |
| Bomb  | 1-9       | U+0031-U+0039 |
| Left  | ˂         | U+02C2        |
| Right | ˃         | U+02C3        |
| Up    | ˄         | U+02C4        |
| Down  | ˅         | U+02C5        |

## Mechanics

Game is synchronous. Time is divided into intervals by ticks.
Game objects act simultaneously, actions last interval, start and end in tick.
Rendering happens in tick, but animation lasts interval.
Server is counting the time and pulling clients player's action every interval.
Clients are waiting for a request from the server and respond with action.

### Request body

```json
{
  "x": 1,
  "y": 1,
  "map": [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "A", " ", " ", "B", " ", " ", " ", "#"],
    ["#", " ", "#", " ", "#", " ", "#", " ", "#"],
    ["#", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", "3", "#", " ", "#", " ", "#", " ", "#"],
    ["#", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", "#", " ", "#", " ", "#", " ", "#"],
    ["#", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"]
  ],
  "players": [
    {
      "x": 4,
      "y": 1,
      "name": "B"
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
}
```

### Response body

```
R
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

**Bomb counts down and explodes**
```
#####     #####     #####     #####
#   #     #   #     #   #     # * #
# 3 #     # 2 #     # 1 #     #***#
#   #     #   #     #   #     # * #
#####     #####     #####     #####
```

**Bomb with power 1 explodes**
```
#######       #######
#     #       #     #
#     #       #  *  #
#  1  #       # *** #
#     #       #  *  #
#     #       #     #
#######       #######
```

**Bomb with power 2 explodes**
```
#######       #######
#     #       #  *  #
#     #       #  *  #
#  1  #       #*****#
#     #       #  *  #
#     #       #  *  #
#######       #######
```

**Bomb with power 2 explodes bomb with power 1 in a chain**
```
#########     #########
#       #     #  *    #
# # # # #     # #*#*# #
#  1 9  #  >  #****** #
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

**Bomb with power 3 explodes, fire is limited to walls**
```
#########         #########
#  #    #         #  #    #
#       #         #  *    #
# #1  # #         # #***# #
#       #         #  *    #
#       #         #  *    #
#       #         #  *    #
#       #         #       #
#########         #########
```
