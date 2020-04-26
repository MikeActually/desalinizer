const grainofsalt = '. '
const spacer = ' '
const calcheight = (salt) => {
  let maxsalt = 0
  let height = 0
  while ((maxsalt += height) < salt) {
    height++
  };
  return height
}

const calcmaxsalt = (moundheight) => {
  let allowedsalt = 0
  let currentlayer = 0
  while (currentlayer++ < moundheight) {
    allowedsalt += currentlayer
  }
  return allowedsalt
}

exports.build = (desiredsalt) => {
  const moundheight = calcheight(desiredsalt)
  const maxsaltallowed = calcmaxsalt(moundheight)
  const saltoffset = maxsaltallowed - desiredsalt
  const saltmound = []

  let remainingsalt = desiredsalt
  let currentrow = moundheight
  let conservesalt = false
  do {
    conservesalt = conservesalt || saltoffset === currentrow
    const layerofsalt = conservesalt ? currentrow - 1 : currentrow
    saltmound[currentrow - 1] = spacer.repeat(moundheight - currentrow) + grainofsalt.repeat(layerofsalt)
    remainingsalt -= layerofsalt
  } while (--currentrow > 0 && remainingsalt > 0)
  return saltmound
}

exports.grainofsalt = grainofsalt
