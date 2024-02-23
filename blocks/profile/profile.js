import { createOptimizedPicture } from '../../scripts/aem.js';

// Function to decorate the profile block
export default function decorate(block) {
  // Create a wrapper div for the profile
  const profileWrapper = document.createElement('div');
  profileWrapper.classList.add('profile-wrapper');

  // Create a div for the profile image
  const profileImage = document.createElement('div');
  profileImage.classList.add('profile-image');
  const img = block.querySelector('img'); // Assuming the image is the first child element
  profileImage.append(img);

  // Append the profile image to the profile wrapper
  profileWrapper.append(profileImage);

  // Create a div for the profile details
  const profileDetails = document.createElement('div');
  profileDetails.classList.add('profile-details');

  // Move the name, contact, and blood group paragraphs to the profile details div
  const paragraphs = [...block.querySelectorAll('p')];
  paragraphs.forEach(paragraph => profileDetails.append(paragraph));

  // Append the profile details to the profile wrapper
  profileWrapper.append(profileDetails);

  // Replace the content of the block with the profile wrapper
  block.textContent = '';
  block.append(profileWrapper);

  // Replace <img> elements inside <picture> with optimized pictures
  img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
}