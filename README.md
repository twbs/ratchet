# [Ratchet](http://goratchet.com)
[![GitHub Release](https://img.shields.io/github/release/twbs/ratchet.svg)](https://github.com/twbs/ratchet/releases)
[![Build Status](https://img.shields.io/travis/twbs/ratchet/master.svg)](https://travis-ci.org/twbs/ratchet)
[![devDependency Status](https://img.shields.io/david/dev/twbs/ratchet.svg)](https://david-dm.org/twbs/ratchet#info=devDependencies)

Build mobile apps with simple HTML, CSS, and JS components.

## Table of contents

* [Getting started](#getting-started)
* [Documentation](#documentation)
* [Support](#support)
* [Contributing](#contributing)
* [Troubleshooting](#troubleshooting)
* [Versioning](#versioning)
* [Maintainers](#maintainers)
* [License](#license)

## Getting started

* Clone the repo with `git clone https://github.com/twbs/ratchet.git` or just [download](http://github.com/twbs/ratchet/archive/v2.0.2.zip) the bundled CSS and JS
* [Read the docs](http://goratchet.com) to learn about the components and how to get a prototype on your phone
* [Check out examples](http://goratchet.com/examples/)

Take note that our master branch is our active, unstable development branch and that if you're looking to download a stable copy of the repo, check the [tagged downloads](https://github.com/twbs/ratchet/tags).

### What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
ratchet/
├── css/
│   ├── ratchet.css
│   ├── ratchet.min.css
│   ├── ratchet-theme-android.css
│   ├── ratchet-theme-android.min.css
│   ├── ratchet-theme-ios.css
│   └── ratchet-theme-ios.min.css
├── js/
│   ├── ratchet.js
│   └── ratchet.min.js
└── fonts/
    ├── ratchicons.eot
    ├── ratchicons.svg
    ├── ratchicons.ttf
    └── ratchicons.woff
```

We provide compiled CSS and JS (`ratchet.*`), as well as compiled and minified CSS and JS (`ratchet.min.*`). The Ratchicon fonts are included, as are the optional Android and iOS platform themes.

## Documentation

Ratchet's documentation is built with [Jekyll](http://jekyllrb.com) and publicly hosted on GitHub Pages at <http://goratchet.com>. The docs may also be run locally.

### Running documentation locally

1. If necessary, [install Jekyll](http://jekyllrb.com/docs/installation) (requires v3.0.x).
  * **Windows users:** Read [this unofficial guide](http://jekyll-windows.juthilo.com/) to get Jekyll up and running without problems.
2. Install the Ruby-based syntax highlighter, [Rouge](https://github.com/jneen/rouge), with `gem install rouge`.
3. From the root `/ratchet` directory, run `jekyll serve` in the command line.
4. Open <http://localhost:4000> in your browser, and boom!

Learn more about using Jekyll by reading its [documentation](http://jekyllrb.com/docs/home/).

### Documentation for previous releases

Documentation for v1.0.2 has been made available for the time being at <http://goratchet.com/1.0.2/> while folks transition to Ratchet 2.

[Previous releases](https://github.com/twbs/ratchet/releases) and their documentation are also available for download.

## Support

Questions or discussions about Ratchet should happen in the [Google group](https://groups.google.com/forum/#!forum/goratchet) or hit us up on Twitter [@GoRatchet](https://twitter.com/goratchet).

## Contributing

Please file a GitHub issue to [report a bug](https://github.com/twbs/ratchet/issues). When reporting a bug, be sure to follow the [contributor guidelines](https://github.com/twbs/ratchet/blob/master/CONTRIBUTING.md).

## Troubleshooting

A small list of "gotchas" is provided below for designers and developers starting to work with Ratchet.

* Ratchet is designed to respond to touch events from a mobile device. In order to use mouse click events (for desktop browsing and testing), you have a few options:
  * Enable touch event emulation in Chrome (found in the overrides tab in the web inspector preferences)
  * Use a JavaScript library like fingerblast.js to emulate touch events (ideally only loaded from desktop devices)
* Script tags containing JavaScript will not be executed on pages that are loaded with push.js. If you would like to attach event handlers to elements on other pages, document-level event delegation is a common solution.
* Ratchet uses XHR requests to fetch additional pages inside the application. Due to security concerns, modern browsers prevent XHR requests when opening files locally (aka using the `file://` protocol); consequently, Ratchet does not work when opened directly as a file.
  * A common solution to this is to simply serve the files from a local server. One convenient way to achieve this is to run `python -m SimpleHTTPServer <port>` to serve up the files in the current directory to `http://localhost:<port>`

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, Ratchet is maintained under the Semantic Versioning guidelines. Sometimes we screw up, but we'll adhere to these rules whenever possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility **bumps the major** while resetting minor and patch
* New additions without breaking backward compatibility **bumps the minor** while resetting the patch
* Bug fixes and misc changes **bumps only the patch**

For more information on SemVer, please visit <http://semver.org/>.

## Maintainers

Connor Sears

* <https://twitter.com/connors>
* <https://github.com/connors>


Created by Connor Sears, Dave Gamache, and Jacob Thornton.


## License

Ratchet is licensed under the [MIT License](http://opensource.org/licenses/MIT).


## 🌐 Web Resources & Interactive Index
- [TURBO RACE](https://brainquestses.pages.dev/turbo-race.html)
- [CATEGORY PUZZLE](https://welearnaction.onrender.com/category-puzzle.html)
- [BRAWLER MAN FIST OF FURY](https://learnaction.netlify.app/brawler-man-fist-of-fury.html)
- [GARAGE MASTER NUTS AND BOLTS](https://learnaction.netlify.app/garage-master-nuts-and-bolts.html)
- [CATEGORY RUNNING](https://eduquestkr.pages.dev/category-running.html)
- [BACTERIA LIFE DEATH](https://eduquestkr.pages.dev/bacteria-life-death.html)
- [JOURNEY OF ESCAPE](https://eduquestkr.pages.dev/journey-of-escape.html)
- [WORD SEARCH UNIVERSE 2](https://eduquests.netlify.app/word-search-universe-2.html)
- [HEXA STACK](https://eduquests.github.io/hexa-stack.html)
- [MASTER BLENDER](https://learnaction.github.io/master-blender.html)
- [HAPPY EGG CATCH](https://ieduquests.web.app/happy-egg-catch.html)
- [CATEGORY BOARDGAMES](https://eduquests.onrender.com/category-boardgames.html)
- [SANDBOX ISLAND WAR](https://eduquestses.pages.dev/sandbox-island-war.html)
- [TAPKO](https://eduquestkr.pages.dev/tapko.html)
- [SPACE SHOOTER SPEED TYPING CHALLENGE](https://welearnaction.onrender.com/space-shooter-speed-typing-challenge.html)
- [CATEGORY HAPARA](https://eduquests.pages.dev/category-hapara.html)
- [CATEGORY MANAGEMENT](https://eduquests.pages.dev/category-management.html)
- [GEOMETRY STARS](https://welearnaction.onrender.com/geometry-stars.html)
- [AIR BLOCK](https://learnaction.netlify.app/air-block.html)
- [BLOCKAPOLYPSE ZOMBIE SHOOTER](https://ieduquests.web.app/blockapolypse-zombie-shooter.html)
- [SPACE SHOOTER SPEED TYPING CHALLENGE](https://eduquestkr.pages.dev/space-shooter-speed-typing-challenge.html)
- [CUBE STACK 2048](https://eduquestkr.pages.dev/cube-stack-2048.html)
- [BUBBLE SHOOTER VALE](https://welearnaction.onrender.com/bubble-shooter-vale.html)
- [PUSH IT 3D](https://eduquestkr.pages.dev/push-it-3d.html)
- [LAST WAR SURVIVAL](https://eduquestkr.pages.dev/last-war-survival.html)
- [TREASURE CHAMPION CHEST CAPTURE](https://ieduquests.web.app/treasure-champion-chest-capture.html)
- [BATTLETABS](https://eduquests.github.io/battletabs.html)
- [GEOMETRY FLAP](https://eduquests.onrender.com/geometry-flap.html)
- [SUPERHERO TRANSFORM CHANGE RACE](https://eduquestspt.pages.dev/superhero-transform-change-race.html)
- [CRICKET CLASH PONG](https://eduquestses.pages.dev/cricket-clash-pong.html)
- [LATUTU HOLIDAY GIFT HUNT](https://learnaction.netlify.app/latutu-holiday-gift-hunt.html)
- [DAILY MATCH](https://eduquests.onrender.com/daily-match.html)
- [CATEGORY DRESS UP](https://eduquests.pages.dev/category-dress-up.html)
- [TILE PAIR MATCH](https://eduquestses.pages.dev/tile-pair-match.html)
- [PACKING LINE](https://welearnaction.onrender.com/packing-line.html)
- [CATEGORY LISTS](https://eduquests.pages.dev/category-lists.html)
- [CATEGORY ONE BUTTON](https://eduquestkr.pages.dev/category-one-button.html)
- [FOAM AND FIND](https://eduquests.onrender.com/foam-and-find.html)
- [MAHJONG MAGIC ISLANDS](https://eduquestses.pages.dev/mahjong-magic-islands.html)
- [CARDS KLONDIKE SOLITAIRE](https://eduquests.onrender.com/cards-klondike-solitaire.html)
- [CATEGORY 3D1 371](https://eduquests.pages.dev/category-3d1-371.html)
- [JEWEL MONSTERS](https://learnaction.netlify.app/jewel-monsters.html)
- [OBBY ESCAPE FROM TSUNAMI BRAINROT](https://welearnaction.onrender.com/obby-escape-from-tsunami-brainrot.html)
- [HERO TOWER WARS MERGE PUZZLE](https://welearnaction.onrender.com/hero-tower-wars-merge-puzzle.html)
- [DUDU ENGINEERING TRUCK](https://eduquestses.pages.dev/dudu-engineering-truck.html)
- [ZOMBIE RUSH](https://eduquestses.pages.dev/zombie-rush.html)
- [TOWER OF FALL](https://learnaction.netlify.app/tower-of-fall.html)
- [GUN MATCH SCREW](https://eduquestkr.pages.dev/gun-match-screw.html)
- [SURVIVAL ISLAND](https://ieduquests.web.app/survival-island.html)
- [TOILET RUSH](https://eduquestses.pages.dev/toilet-rush.html)
- [BANK ROBBERY ESCAPE](https://eduquests.pages.dev/bank-robbery-escape.html)
- [HAZEL TANGLE ROPE 3D SORTING PUZZLE](https://eduquestses.pages.dev/hazel-tangle-rope-3d-sorting-puzzle.html)
- [FRUIT SORT LOGIC](https://eduquests.onrender.com/fruit-sort-logic.html)
- [DONT TAP](https://eduquestses.pages.dev/dont-tap.html)
- [OPENGUESSR](https://learnaction.netlify.app/openguessr.html)
- [BIG BAD APE](https://eduquestses.pages.dev/big-bad-ape.html)
- [TOCA TEENS FLOATING BEACH PARTY](https://eduquests.onrender.com/toca-teens-floating-beach-party.html)
- [CUTE COLORING GAMES](https://eduquestses.pages.dev/cute-coloring-games.html)
- [CANASTA ROYALE OFFLINE](https://eduquests.onrender.com/canasta-royale-offline.html)
- [WILD TANKS](https://learnaction.netlify.app/wild-tanks.html)
- [CATEGORY FOOTBALL](https://welearnaction.onrender.com/category-football.html)
- [DINO SLIDE](https://eduquests.onrender.com/dino-slide.html)
- [TAP BLOCK PUZZLE SMASH GAME](https://eduquestkr.pages.dev/tap-block-puzzle-smash-game.html)
- [HEXA SORT 3D](https://eduquests.pages.dev/hexa-sort-3d.html)
- [CATEGORY SURVIVAL365](https://learnaction.netlify.app/category-survival365.html)
- [CATEGORY CARE](https://welearnaction.onrender.com/category-care.html)
- [FIGHT FOR THE TREE](https://eduquestkr.pages.dev/fight-for-the-tree.html)
- [TIMBERLAND ARRANGE PUZZLE GAME](https://welearnaction.onrender.com/timberland-arrange-puzzle-game.html)
- [BLACK PINK HALLOWEEN CONCERT](https://eduquests.pages.dev/black-pink-halloween-concert.html)
- [FASHION PRINCESS DRESS UP FOR GIRLS](https://eduquestses.pages.dev/fashion-princess-dress-up-for-girls.html)
- [CATEGORY HORROR](https://learnaction.netlify.app/category-horror.html)
- [CATEGORY OBBY56](https://eduquestkr.pages.dev/category-obby56.html)
- [FROM NERD TO POPULAR BALLERINA CAPPUCCINA](https://eduquestses.pages.dev/from-nerd-to-popular-ballerina-cappuccina.html)
- [MOJICON GARDEN JIGSOLITAIRE](https://eduquests.onrender.com/mojicon-garden-jigsolitaire.html)
- [PRINCESS VALENTINES CRUSH](https://eduquestkr.pages.dev/princess-valentines-crush.html)
- [CHILDRENS DOCTOR TREATING EARS](https://eduquestspt.pages.dev/childrens-doctor-treating-ears.html)
- [DOWNHILL CAR RIDE CRASH TEST](https://ieduquests.web.app/downhill-car-ride-crash-test.html)
- [CRAFTSMAN 3D GANGSTER](https://eduquestses.pages.dev/craftsman-3d-gangster.html)
- [FORMULA RACERS](https://welearnaction.onrender.com/formula-racers.html)
- [SQUISHY TABA PAW ASMR](https://eduquestses.pages.dev/squishy-taba-paw-asmr.html)
- [ULTIMATE ROBO DUEL 3D](https://eduquestkr.pages.dev/ultimate-robo-duel-3d.html)
- [RESTAURANT SIMULATOR BURGERS PIZZA](https://eduquests.pages.dev/restaurant-simulator-burgers-pizza.html)
- [INDEX3](https://ieduquests.web.app/index3.html)
- [CATEGORY UNBLOCKED](https://eduquestkr.pages.dev/category-unblocked.html)
- [CATEGORY POINT AND CLICK124](https://eduquestspt.pages.dev/category-point-and-click124.html)
- [SCREW PUZZLE MASTER](https://eduquests.onrender.com/screw-puzzle-master.html)
- [ROYAL KITCHEN THE LOST KING](https://eduquestses.pages.dev/royal-kitchen-the-lost-king.html)
- [AOD ART OF DEFENSE](https://eduquests.onrender.com/aod-art-of-defense.html)
- [WE WILL NOT SURVIVE](https://welearnaction.onrender.com/we-will-not-survive.html)
- [FARM BUSINESS SAGA](https://welearnaction.onrender.com/farm-business-saga.html)
- [OBBY DRAW TO ESCAPE](https://ieduquests.web.app/obby-draw-to-escape.html)
- [MY FARM EMPIRE](https://ieduquests.web.app/my-farm-empire.html)
- [CATEGORY JIGSAW](https://learnaction.netlify.app/category-jigsaw.html)
- [MAGIC PRINCESS DRESS UP DOLL](https://learnaction.netlify.app/magic-princess-dress-up-doll.html)
- [ZIP ZAP](https://eduquests.onrender.com/zip-zap.html)
- [THREAD MATCH 2](https://eduquestses.pages.dev/thread-match-2.html)
- [BLOCK BREAKER](https://eduquestses.pages.dev/block-breaker.html)
- [CATEGORY FREE RAGDOLL GAMES](https://ieduquests.web.app/category-free-ragdoll-games.html)
- [CATEGORY PIXEL313](https://eduquestspt.pages.dev/category-pixel313.html)
- [CATEGORY CASUAL 16](https://ieduquests.web.app/category-casual-16.html)
- [THE ROMAN EMPIRE COLOSSEUM](https://eduquests.pages.dev/the-roman-empire-colosseum.html)
- [CATEGORY CASUAL 5](https://learnaction.netlify.app/category-casual-5.html)
- [GUMMY MERGE](https://eduquests.onrender.com/gummy-merge.html)
- [BOARD KINGS BOARD DICE](https://ieduquests.web.app/board-kings-board-dice.html)
- [CATEGORY ADVENTURE](https://eduquestspt.pages.dev/category-adventure.html)
- [1010 ELIXIR ALCHEMY](https://welearnaction.onrender.com/1010-elixir-alchemy.html)
- [IDLE FARM](https://eduquests.pages.dev/idle-farm.html)
- [CATEGORY IDLE GAMES](https://learnaction.netlify.app/category-idle-games.html)
- [CATEGORY RACING DRIVING 2](https://eduquestspt.pages.dev/category-racing-driving-2.html)
- [MEMORY WARS](https://eduquestkr.pages.dev/memory-wars.html)
- [STICKMAN DINOSAUR ARENA](https://eduquests.pages.dev/stickman-dinosaur-arena.html)
- [FUTURE WAR BOT BATTLE IN SPACE 3D](https://ieduquests.web.app/future-war-bot-battle-in-space-3d.html)
- [CATEGORY SHOOTER](https://eduquestspt.pages.dev/category-shooter.html)
- [HIDDEN OBJECTS VACATION IN BRAZIL](https://welearnaction.onrender.com/hidden-objects-vacation-in-brazil.html)
- [GT FORMULA CHAMPIONSHIP](https://welearnaction.onrender.com/gt-formula-championship.html)
- [BOUNCING CHICK](https://eduquests.pages.dev/bouncing-chick.html)
- [ZOMBIE SURVIVAL](https://ieduquests.web.app/zombie-survival.html)
- [CATEGORY WAR](https://eduquestspt.pages.dev/category-war.html)
- [TRAITOR BEAVER](https://welearnaction.onrender.com/traitor-beaver.html)
- [LITTLE BUGS](https://learnaction.netlify.app/little-bugs.html)
- [DEMOLITION DERBY DERBY](https://eduquests.pages.dev/demolition-derby-derby.html)
- [SAND BLOCK BLAST](https://eduquests.onrender.com/sand-block-blast.html)
- [LUNA AND THE MAGIC MAZE](https://eduquestses.pages.dev/luna-and-the-magic-maze.html)
- [INDEX23](https://eduquests.pages.dev/index23.html)
- [OIL DIGGING](https://eduquestses.pages.dev/oil-digging.html)
- [CATEGORY QUIZ](https://eduquestkr.pages.dev/category-quiz.html)
- [CATEGORY COLLECT565](https://ieduquests.web.app/category-collect565.html)
- [FAST LAP](https://eduquests.github.io/fast-lap.html)
- [GEOMETRY MISSILE](https://welearnaction.onrender.com/geometry-missile.html)
- [CATEGORY PIXEL313](https://eduquestkr.pages.dev/category-pixel313.html)
