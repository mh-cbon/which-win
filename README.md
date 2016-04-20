# which-win

Tells which windows system version is being run.

# install

```sh
npm i @mh-cbon/which-win --save
```

# Usage

```js
require('@mh-cbon/which-win')(function (err, info) {
  err && console.error("Not found\n%s %j", err, err);
  !err && console.error('found version information\n%j', info)
})
```

# Internals

It relies on `systeminfo`, when it s available, otherwise it uses `ver` and a bunch of pre-built detection to give you better information.

# read more
- http://ss64.com/nt/systeminfo.html
- https://technet.microsoft.com/en-us/library/bb491007.aspx
- https://msdn.microsoft.com/en-us/library/ms724834%28VS.85%29.aspx
- http://www.msigeek.com/442/windows-os-version-numbers
- http://www.nirmaltv.com/2009/08/17/windows-os-version-numbers/
- http://www.robvanderwoude.com/ver.php
- http://www.robvanderwoude.com/ver.php
- https://msdn.microsoft.com/en-us/library/windows/desktop/ms724832%28v=vs.85%29.aspx
