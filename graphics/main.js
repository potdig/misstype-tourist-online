const sideBar = new Vue({
  el: '#side',
  data: function () {
    return {
      members: []
    }
  }
})

const captionBar = new Vue({
  el: '#bottom',
  data: function () {
    return {
      caption: ''
    }
  }
})

const memberReplicant = nodecg.Replicant('members')
memberReplicant.on('change', newMembers => {
  sideBar.members = []
  newMembers.forEach(member => {
    sideBar.members.push({
      name: member.name,
      score: member.score,
      isGuest: member.isGuest
    })
  })
})

const captionReplicant = nodecg.Replicant('caption')
captionReplicant.on('change', newCaption => captionBar.caption = newCaption)