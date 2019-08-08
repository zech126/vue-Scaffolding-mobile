---
to: "src/views/<%= h.inflection.dasherize(name) %>.vue"
---
<%
  const fileName = h.inflection.dasherize(name)
  const importName = h.inflection.camelize(fileName.replace(/-/g, '_'))
%><script>
export default {
  name: '<%= importName %>',

  metaInfo: {
    title: '<%= importName %>'
  }
}
</script>

<template>
  <Layout>
    <%= h.inflection.titleize(name.replace(/-/g, '_')) %>
  </Layout>
</template>
<%

if (useStyles) { %>
<style lang="less">
</style>
<% } %>
