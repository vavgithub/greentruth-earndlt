function openDialog(card) {
  const title = card.dataset.title;
  const body = card.dataset.body;

  document.getElementById("dialogTitle").innerText = title;
  document.getElementById("dialogBody").innerText = body;

  document.getElementById("methodologyDialog").showModal();
}

function closeDialog() {
  document.getElementById("methodologyDialog").close();
}
