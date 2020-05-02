async function feed(parent, args, context) {
  const count = await context.prisma
    .linksConnection({
      where: {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter },
        ],
      },
    })
    .aggregate()
    .count()
  const links = await context.prisma.links({
    where: {
      OR: [
        { description_contains: args.filter },
        { url_contains: args.filter },
      ],
    },
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  })
  return {
    count,
    links,
  }
}
 
async function emp(parent, args, context, info) {
  const count = await context.prisma
  .employeesConnection()
  .aggregate()
  .count()
const employees = await context.prisma.employees({
  skip: args.skip,
  first: args.first,
  orderBy: args.orderBy,
})
return {

  employees,
  count
}
}

module.exports = {
  feed,
  emp
}
