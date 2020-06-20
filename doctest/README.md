## Suite Statuses/Stages

| Abbr      | Description | Now      | [Modal](https://www.ietf.org/rfc/rfc2119.txt) | Fut            | Changes     | Args |
| --------- | ----------- | -------- | -------------- | --------- | --------- | --------- |
| `DONE`    | Implemented | `X => Y` | MUST   | `X => Y`       | N      | 2     |
| `LEG` | Legacy  | `X => Y` | SHOULD | `X => Y` | N | 2 |
| `DEPR`    | Deprecated  | `X => Y` | SHOULD NOT | `X !> Y`<br/>`N ?> Y`<br/>`X ?> Z` | I/O | 2-4 |
| `WONT` | Will Not Be | `X !> Y` | MUST NOT | `X !> Y` | N | 2 |
| `TBD` | To be done | `X !> Y`<br/>`X ?> Z` | SHOULD | `X => Y` | O | 2-3 |
| `BUG+` | Bug | `X !> Y`<br/>`X => Z` | MUST | `X => Y` | O | 3 |
| `BUG-` | Bug | `X => Y`<br/>`X ?> Z` | MUST | `X !> Y`<br/>`X ?> Z` | O | 2-3 |
| `UNST` | Unstable | `X => Y` | MAY | `X !> Y` | O | 2 |
| `OPT` | Optional | `X !> Y`<br/> `X ?> Z` | MAY | `X => Y` | O | 2-3 |
| `PROP` | Proposal | `X => Y`<br/>`N => Z` | MAY | `X => Z`<br/>`N => Y` | IO | 4 |
| `BRK` | Breaking |  |  |  |  |  |
| `QUES` | Question | `? => Y` | *how* | `X => Y` | I | 1 |




```mermaid
graph LR

subgraph LEGEND
status1 --semver--> status2
status1 -.no implementation changes.-> status2
status1 ==changes==> status2
end

subgraph Implemented
DONE[Done]
UNST{{Unstable}}
WONT[Will not be]
end
LEG[Legacy]
DEPR{{Deprecated}}
TBD{{To be done}}
BUG{{Bug}}
OPT{{Optional}}
PROP{{Proposal}}
BRK{{Breaking}}
QUEST{{Question}}

DEPR ==major==> WONT
LEG -.-> DEPR
DONE -.-> LEG

UNST -.release.-> DONE
UNST -.-> WONT

TBD ==minor==> DONE
TBD -.-> WONT
BUG ==patch==> DONE
BUG -.-> WONT

TBD --pre--> UNST
BUG --pre--> UNST

OPT -.-> TBD
OPT -.-> WONT

BRK ==major==> DONE 
```

