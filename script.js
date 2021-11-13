html,
body {
  height: 100%;
  width: 100%;
  background: #fff;
  position: fixed;
}

.names-flex {
  position: relative;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
}

.names-flex::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.names-flex {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.names-flex.names-content {
  padding-top: 0;
  padding-bottom: 0;
}
.section.content.wf-section {
  z-index: 3;
  height: 100% !important;
}
