// Description:

// The Vigenère cipher is a classic cipher originally developed by Italian cryptographer Giovan Battista Bellaso
// and published in 1553. It is named after a later French cryptographer Blaise de Vigenère, who had developed a stronger
// autokey cipher (a cipher that incorporates the message of the text into the key).

// The cipher is easy to understand and implement, but survived three centuries of attempts to break it, earning it the nickname
// "le chiffre indéchiffrable" or "the indecipherable cipher."

// From Wikipedia:

// The Vigenère cipher is a method of encrypting alphabetic text by using a series of different Caesar ciphers based on the
// letters of a keyword. It is a simple form of polyalphabetic substitution.
// (...)

// In a Caesar cipher, each letter of the alphabet is shifted along some number of places; for example, in a Caesar cipher
// of shift 3, A would become D, B would become E, Y would become B and so on. The Vigenère cipher consists of several Caesar
// ciphers in sequence with different shift values.
// Assume the key is repeated for the length of the text, character by character. Note that some implementations repeat the
// key over characters only if they are part of the alphabet, and that is not the case here.

// The shift is derived by applying a Caesar shift to a character with the corresponding index of the key in the alphabet.

// Visual representation (suggested by OverZealous)

// message: my secret code i want to secure
// key:     passwordpasswordpasswordpasswor
// Write a class that, when given a key and an alphabet, can be used to encode and decode from the cipher.


function VigenèreCipher(key, abc) {

  this.encode = function (str) {
    var encrypted_message = "";
    var keyword_index = 0;
    for (var i=0; i<str.length; i++) {
      var reference = abc.indexOf(str[i]);
      if (reference < 0) {
        encrypted_message += str[i];
        keyword_index = (keyword_index + 1) % key.length;
      } else {
        var key_ref = abc.indexOf(key[keyword_index]);
        var encrypted_letter = (reference + key_ref) % abc.length;        
        encrypted_message += abc[encrypted_letter];
        keyword_index = (keyword_index + 1) % key.length;
      }
    }
    return encrypted_message;
  };
  
  this.decode = function (str) {
    var decrypted_message = "";
    var keyword_index = 0;
    for (var i=0; i<str.length; i++) {
      var reference = abc.indexOf(str[i]);
      var key_ref = abc.indexOf(key[keyword_index]);
      if (reference < 0) {
        decrypted_message += str[i];
        keyword_index = (keyword_index + 1) % key.length;
      } else if (reference > key_ref) {
        var decrypted_letter = (reference - key_ref) % abc.length;        
        decrypted_message += abc[decrypted_letter];
        keyword_index = (keyword_index + 1) % key.length;
      } else {
        var decrypted_letter = (abc.length + reference - key_ref) % abc.length;        
        decrypted_message += abc[decrypted_letter];
        keyword_index = (keyword_index + 1) % key.length;
      }
    }
    return decrypted_message;
  };
}
