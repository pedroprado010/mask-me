# Mask Me

Framework neutral input masking.

### Installing

```
npm install --save @plcsp/mask-me
```

## Using it

import MaskMe function and pass it a mask string.
```
import MaskMe from 'mask-me'
// or
var MaskMe = require('mask-me')

var myMask = MaskMe('00/00/000')
```

### Special chars

- **\#** : loop char
```
var myMask = MaskMe('.#')
myMask('000') // returns .0.0.0
```
- **A**: accepts alphabetical chars
- **S**: accepts alphanumeric
- **0**: accepts numeric
- **9**: accepts numeric, but its optional (will pass to next test if receive a non numeric)

### Options

Choose direction where mask will start parsing.
```
var myMask = MaskMe('##.00', {startAt: 'right'}) // default is left
```

## Examples

```
var moneyMask = MaskMe('##.#0,00', {startAt: 'right'})
moneyMask(11122233344455) // 111.222.333.444,55
var dateMask = MaskMe('00/00/0000')
dateMask(20112000) // 20/11/2000
var ipMask = MaskMe('990.990.990.990')
ipMask('192180 100') // 192.168.0.100
```
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
