export default {
    fullDate (newDate) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      const date = new Date(newDate)
      return date.toLocaleDateString('en-GB', options)
    },
    messageDate (newDate) {
      newDate = new Date(newDate)
      const ntime = newDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      return ntime 
    },
    historyDate (newDate) {
      newDate = new Date(newDate)
      const ntime = newDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      const nday = newDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      return ntime + ' | ' + nday
    }
  }
  