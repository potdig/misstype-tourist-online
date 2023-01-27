class Member {
  constructor(name, score, appendedScore, isGuest) {
    this.name = name
    this.score = score
    this.appendedScore = parseInt(appendedScore)
    this.isGuest = isGuest
  }

  sumScore() {
    this.score += parseInt(this.appendedScore)
    this.appendedScore = 0
  }
}

const replicant = nodecg.Replicant("members", {
  defaultValue: [
    new Member("ルゼ", 0, 0, false),
    new Member("potdig", 0, 0, false),
    new Member("かまたり", 0, 0, false),
    new Member("まさお", 0, 0, false),
    new Member("zrk", 0, 0, false),
    new Member("daisan", 0, 0, false),
    new Member("あおお", 0, 0, false),
    new Member("Cosith", 0, 0, false),
    new Member("Morph", 0, 0, false),
    new Member("緋藤レイル", 0, 0, false),
    new Member("たばた", 0, 0, false),
    new Member("BACO", 0, 0, false)
  ]
})

function isScoreBoardIdAttr(node) {
  if (node.nodeType != Node.ATTRIBUTE_NODE) {
    return false
  }
  return node.name == 'id' && node.value == 'scoreboard'
}

const observer = new MutationObserver(mutations => {
  if (!document.getElementById('scoreboard')) {
    return
  }
  console.log('hoi')
  observer.disconnect()

  const scoreBoard = new Vue({
    el: '#scoreboard',
    data: function () {
      return {
        members: [],
        newName: "",
        isGuest: false
      }
    },
    methods: {
      applyAppendedScore() {
        console.log(this.members)
        this.members.forEach(member => {
          member.sumScore()
        });

        replicant.value = this.members
      },
      add() {
        if (this.newName.length > 0) {
          this.members.push(new Member(this.newName, 0, 0, this.isGuest))
        }
        this.newName = ""
        this.isGuest = false
        replicant.value = this.members
      },
      remove(removal) {
        this.members = this.members.filter(member => member.name !== removal.name)
        replicant.value = this.members
      }
    }
  })

  replicant.on('change', (newMembers) => {
    scoreBoard.members = []
    newMembers.forEach(member => {
      scoreBoard.members.push(new Member(member.name, member.score, member.appendedScore, member.isGuest))
    })
  })

  observer.disconnect()
})

observer.observe(document, { childList: true, subtree: true })