
// |+1| -1' -1 +1# +2 -2'' -2' -2/+3 -3''' -3'' -3' -3 |+4| -4' -4 +4# +5 -5 +5# +6 -6' -6 +6# -7 |+7| -7' -8 +8# +8 -9 +9# +9 -9' -10 +10## +10# |+10| -10'
// |C| Db D Eb E F Gb G Ab A Bb B |C| Db D Eb E F Gb G Ab A Bb B |C| Db D Eb E F Gb G Ab A Bb B |C| Db

const diatonicInCNotes = [
  { octave: 4, key: "C", hole: "+1"     },
  { octave: 4, key: "Db", hole: "-1'"   },
  { octave: 4, key: "D", hole: "-1"     },
  { octave: 4, key: "Eb", hole: "+1#"   },
  { octave: 4, key: "E", hole: "+2"     },
  { octave: 4, key: "F", hole: "-2''"   },
  { octave: 4, key: "Gb", hole: "-2'"   },
  { octave: 4, key: "G", hole: "-2"     },
  { octave: 4, key: "G", hole: "+3"     },
  { octave: 4, key: "Ab", hole: "-3'''" },
  { octave: 4, key: "A", hole: "-3''"   },
  { octave: 4, key: "Bb", hole: "-3'"   },
  { octave: 4, key: "B", hole: "-3"     },

  { octave: 5, key: "C", hole: "+4"   },
  { octave: 5, key: "Db", hole: "-4'" },
  { octave: 5, key: "D", hole: "-4"   },
  { octave: 5, key: "Eb", hole: "+4#" },
  { octave: 5, key: "E", hole: "+5"   },
  { octave: 5, key: "F", hole: "-5"   },
  { octave: 5, key: "Gb", hole: "+5#" },
  { octave: 5, key: "G", hole: "+6"   },
  { octave: 5, key: "Ab", hole: "-6'" },
  { octave: 5, key: "A", hole: "-6"   },
  { octave: 5, key: "Bb", hole: "+6#" },
  { octave: 5, key: "B", hole: "-7"   },

  { octave: 6, key: "C", hole: "+7"     },
  { octave: 6, key: "Db", hole: "-7'"   },
  { octave: 6, key: "D", hole: "-8"     },
  { octave: 6, key: "Eb", hole: "+8#"   },
  { octave: 6, key: "E", hole: "+8"     },
  { octave: 6, key: "F", hole: "-9"     },
  { octave: 6, key: "Gb", hole: "+9#"   },
  { octave: 6, key: "G", hole: "+9"     },
  { octave: 6, key: "Ab", hole: "-9'"   },
  { octave: 6, key: "A", hole: "-10"    },
  { octave: 6, key: "Bb", hole: "+10##" },
  { octave: 6, key: "B", hole: "+10#"   },

  { octave: 7, key: "C", hole: "+10"   },
  { octave: 7, key: "Db", hole: "-10'" },
]

export const transpose = (tablature, pitchAdjustment = -1) => {
  const standardizedTablature = _standardizeNotations(tablature)
  const mappedNotes = _mapTablatureToDefinition(standardizedTablature, diatonicInCNotes)
  const transposedTablature = mappedNotes.map(mn => mn === '\\n'
    ? { hole: '\n' }
    : diatonicInCNotes.find(x => x.octave === mn.octave + pitchAdjustment && x.key === mn.key)
  )

  return transposedTablature
    .map(x => x.hole)
    .join(' ')
    .replace(/^\s+/gm, '')
}

function _standardizeNotations(tablature) {
  return tablature
    .replace(/(\d'*)\n/g, '$1 \\n ')
    .replace(/(?<![+-])(\d)/g, '+$1')
}

function _mapTablatureToDefinition(tablature, definition) {
  const isHoleNotation = /\d/.test(tablature)
  const getNote = isHoleNotation
    ? (notes, note) => notes.find(n => n.hole === note)
    : (notes, note) => notes.find(n => n.key === note)

    return tablature
      .split(/\s+/)
      .map(note => /\\n/.test(note)
        ? note
        : getNote(definition, note))
}
