// function formatDateInternal(date, format) {
//   switch (format) {
//     case 'MM/DD/YY':
//       return date.toLocaleDateString('en-US', {
//         month: '2-digit',
//         day: '2-digit',
//         year: '2-digit',
//       })

//     case 'MM/DD/YYYY':
//       return date.toLocaleDateString('en-US', {
//         month: '2-digit',
//         day: '2-digit',
//         year: 'numeric',
//       })

//     case 'DD/MM/YY':
//       return date.toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: '2-digit',
//       })
//     case 'YY/MM/DD':
//       return date.toLocaleDateString('en-CA', {
//         year: '2-digit',
//         month: '2-digit',
//         day: '2-digit',
//       })
//     case 'Month D, Yr':
//       return date.toLocaleDateString('en-US', {
//         month: 'long',
//         day: 'numeric',
//         year: 'numeric',
//       })
//     case 'M/D/YY':
//       return date.toLocaleDateString('en-US', {
//         month: 'numeric',
//         day: 'numeric',
//         year: '2-digit',
//       })
//     case 'D/M/YY':
//       return date.toLocaleDateString('en-GB', {
//         day: 'numeric',
//         month: 'numeric',
//         year: '2-digit',
//       })
//     case 'YY/M/D':
//       return date.toLocaleDateString('en-CA', {
//         year: '2-digit',
//         month: 'numeric',
//         day: 'numeric',
//       })
//     case 'bM/bD/YY':
//       return date
//         .toLocaleDateString('en-US', {
//           month: 'numeric',
//           day: 'numeric',
//           year: '2-digit',
//         })
//         .replace(/\//g, ' ')
//     case 'bD/bM/YY':
//       return date
//         .toLocaleDateString('en-GB', {
//           day: 'numeric',
//           month: 'numeric',
//           year: '2-digit',
//         })
//         .replace(/\//g, ' ')
//     case 'YY/ bM/bD':
//       return date
//         .toLocaleDateString('en-CA', {
//           year: '2-digit',
//           month: 'numeric',
//           day: 'numeric',
//         })
//         .replace(/\//g, ' ')
//     case 'MMDDYY':
//       return date
//         .toLocaleDateString('en-US', {
//           month: '2-digit',
//           day: '2-digit',
//           year: '2-digit',
//         })
//         .replace(/\//g, '')
//     case 'DDMMYY':
//       return date
//         .toLocaleDateString('en-GB', {
//           day: '2-digit',
//           month: '2-digit',
//           year: '2-digit',
//         })
//         .replace(/\//g, '')
//     case 'YYMMDD':
//       return date
//         .toLocaleDateString('en-CA', {
//           year: '2-digit',
//           month: '2-digit',
//           day: '2-digit',
//         })
//         .replace(/\//g, '')
//     case 'MonDDYY':
//       return date.toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: '2-digit',
//       })
//     case 'DDMonYY':
//       return date.toLocaleDateString('en-US', {
//         day: 'numeric',
//         month: 'short',
//         year: '2-digit',
//       })
//     case 'YYMonDD':
//       return date.toLocaleDateString('en-US', {
//         year: '2-digit',
//         month: 'short',
//         day: 'numeric',
//       })
//     case 'day/YY':
//       return date.toLocaleDateString('en-US', {
//         day: 'numeric',
//         year: 'numeric',
//       })
//     case 'YY/day':
//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         day: 'numeric',
//       })
//     case 'D Month, Yr':
//       return date.toLocaleDateString('en-US', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric',
//       })
//     case 'Yr, Month D':
//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//       })
//     case 'Mon-DD-YYYY':
//       return date.toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric',
//       })
//     case 'DD-Mon-YYYY':
//       return date.toLocaleDateString('en-US', {
//         day: 'numeric',
//         month: 'short',
//         year: 'numeric',
//       })
//     case 'YYYYY-Mon-DD':
//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//       })
//     case 'Mon DD, YYYY':
//       return date.toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric',
//       })
//     case 'DD Mon, YYYY':
//       return date.toLocaleDateString('en-US', {
//         day: 'numeric',
//         month: 'short',
//         year: 'numeric',
//       })
//     case 'YYYY, Mon DD':
//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//       })
//     default:
//       return date.toLocaleDateString() // Use the default format if no match
//   }
// }
function formatDateInternal(date, format) {
  switch (format) {
    case 'MM/DD/YY':
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
      })

    case 'MM/DD/YYYY':
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })

    case 'DD/MM/YY':
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      })

    case 'YY/MM/DD':
      return date.toLocaleDateString('en-CA', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })

    case 'Month D, Yr':
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: '2-digit',
      })

    case 'M/D/YY':
      return date.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit',
      })

    case 'D/M/YY':
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',
      })

    case 'YY/M/D':
      return date.toLocaleDateString('en-CA', {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
      })

    case 'bM/bD/YY':
      return date.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit',
      }).replace(/\//g, ' ')

    case 'bD/bM/YY':
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',
      }).replace(/\//g, ' ')

    case 'YY/ bM/bD':
      return date.toLocaleDateString('en-CA', {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
      }).replace(/\//g, ' ')

    case 'MMDDYY':
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
      }).replace(/\//g, '')

    case 'DDMMYY':
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).replace(/\//g, '')

    case 'YYMMDD':
      return date.toLocaleDateString('en-CA', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '')

    case 'MonDDYY':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: '2-digit',
      })

    case 'DDMonYY':
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
      })

    case 'YYMonDD':
      return date.toLocaleDateString('en-US', {
        year: '2-digit',
        month: 'short',
        day: 'numeric',
      })

    case 'day/YY':
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        year: '2-digit',
      })

    case 'YY/day':
      return date.toLocaleDateString('en-US', {
        year: '2-digit',
        day: 'numeric',
      })

    case 'D Month, Yr':
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: '2-digit',
      })

    case 'Yr, Month D':
      return date.toLocaleDateString('en-US', {
        year: '2-digit',
        month: 'long',
        day: 'numeric',
      })

    case 'Mon-DD-YYYY':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })

    case 'DD-Mon-YYYY':
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })

    case 'YYYYY-Mon-DD':
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })

    case 'Mon DD, YYYY':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })

    case 'DD Mon, YYYY':
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })

    case 'YYYY, Mon DD':
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })

      // Additional formats
    case 'MM-DD-YY':
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
      }).replace(/\//g, '-')

    case 'DD-MM-YY':
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).replace(/\//g, '-')

    case 'YY-MM-DD':
      return date.toLocaleDateString('en-CA', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '-')

    case 'YYYY-MM-DD':
      return date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '-')

    case 'YYYY/DD/MM':
      return date.toLocaleDateString('en-CA', {
        year: 'numeric',
        day: '2-digit',
        month: '2-digit',
      }).replace(/\//g, '/')

    case 'DD-MM-YYYY':
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).replace(/\//g, '-')
    case 'MM-DD-YYYY':
      return date
        .toLocaleDateString('en-GB', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        })
        .replace(/\//g, '-')
    default:
      return date.toLocaleDateString() // Use the default format if no match
  }
}

export function generateCurrentDate(format) {
  const currentDate = new Date()
  return formatDateInternal(currentDate, format)
}

export function formatDateForInput(dateValue, format) {
  if (!dateValue)
    return ''

  const currentDate = new Date(dateValue)
  return formatDateInternal(currentDate, format)
}

function formatTimeInternal(timeValue, format) {
  if (!timeValue)
    return ''

  // Parse the timeValue
  const date = new Date(timeValue)
  if (isNaN(date.getTime()))

    throw new RangeError('Invalid time value')

  // console.log('date', date)

  switch (format) {
    case 'HH:MM:SS':
      return new Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(date)
    case 'HH:MM:SS XM':
      return new Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(date)
    case 'HH:MM':
      return new Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(date)
    case 'HH:MM XM':
      return new Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(date)
    default:
      return new Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(date)
  }
}

export function generateCurrentTime(format) {
  const now = new Date()
  return formatTimeInternal(now, format)
}

export function formatTimeForInput(timeValue, format) {
  if (!timeValue)
    return ''
  return formatTimeInternal(timeValue, format?.name ? format?.name : format)
}

export function parseDateString(dateString) {
  // Common date formats you expect
  const datePatterns = [
    { regex: /^(\d{2})\/(\d{2})\/(\d{4})$/, format: '$3-$2-$1' }, // dd/MM/yyyy
    { regex: /^(\d{2})-(\d{2})-(\d{4})$/, format: '$3-$1-$2' }, // dd-MM-yyyy
    { regex: /^(\d{4})-(\d{2})-(\d{2})$/, format: '$1-$2-$3' }, // yyyy-MM-dd
    { regex: /^(\d{2})\/(\d{2})\/(\d{2})$/, format: '20$3-$1-$2' }, // MM/dd/yy
    { regex: /^(\d{2})\/(\d{2})\/(\d{2})$/, format: '20$3-$2-$1' }, // dd/MM/yy
    { regex: /^(\d{2})\/(\d{2})\/(\d{4})$/, format: '$3-$1-$2' }, // MM/dd/yyyy
    { regex: /^(\d{2})-(\d{2})-(\d{2})$/, format: '20$3-$1-$2' }, // dd-MM-yy
    { regex: /^(\d{2})-(\d{2})-(\d{2})$/, format: '20$3-$2-$1' }, // MM-dd-yy
    { regex: /^(\d{2})-(\d{2})-(\d{4})$/, format: '$3-$2-$1' }, // MM-dd-yyyy
    // Add more patterns as needed
  ]

  for (const pattern of datePatterns) {
    if (pattern.regex.test(dateString)) {
      const formattedDate = dateString.replace(pattern.regex, pattern.format)
      const dateObject = new Date(formattedDate)

      if (!isNaN(dateObject))
        return dateObject
    }
  }

  // If no pattern matched, return an Invalid Date
  return new Date(Number.NaN)
}
