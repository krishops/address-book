//Business Logic for AddressBook ----
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id)  {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

//Business Logic for Contacts ----
function Contact(firstName, lastName, phoneNumber, emailAddress, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.addresses = {}
  // this.address = address;
}

// Contact.prototype.fullName = function() {
//   return this.firstName + " " + this.lastName;
// };

Contact.prototype.addAddress = function()  {
  this.addresses[address.homeAddress] =address
}

//Business logic for Addresses
function Addresses(homeAddress, workAddress)  {
  this.homeAddress = homeAddress;
  this.workAddress = workAddress;
}

//User Interface Logic ----
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay)  {
  let contactslist = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key)  {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactslist.html(htmlForContactInfo);
  }

  function showContact(contactId) {
    const contact = addressBook.findContact(contactId);
    $("#show-contact").show();
    $(".first-name").html(contact.firstName);
    $(".last-name").html(contact.lastName);
    $(".phone-number").html(contact.phoneNumber);
    $(".email-address").html(contact.emailAddress);
    $(".address").html(contact.address);
    let buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class ='deleteButton' id=" + + contact.id + ">Delete</button>");
  }

  function attachContactListeners() {
    $("ul#contacts").on("click", "li", function() {
      showContact(this.id);
    });
    $("#buttons").on("click", ".deleteButton", function() {
      addressBook.deleteContact(this.id);
      $("#show-contact").hide();
      displayContactDetails(addressBook);
    })
  }

$(document).ready(function()  {
  attachContactListeners();
  $("form#new-contact").submit(function(event)  {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmailAddress = $("input#new-email-address").val();
    const inputtedAddress = $("input#new-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-address").val("");
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
