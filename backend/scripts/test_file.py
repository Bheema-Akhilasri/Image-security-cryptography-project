# import cv2
# import matplotlib.pyplot as plt
# import os
# import glob

# # Path to extracted misc folder (update this path)
# image_folder = r"data\raw\misc"   # <-- replace with your extracted folder path

# # Get all images (tiff format in misc.zip)
# image_paths = glob.glob(os.path.join(image_folder, "*.tiff"))

# print(f"Found {len(image_paths)} images")

# # Show a few images
# for idx, img_path in enumerate(image_paths[:5]):  # show first 5 images
#     # Read image (OpenCV loads as BGR by default)
#     img = cv2.imread(img_path)
    
#     # Convert to RGB for matplotlib
#     img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
#     plt.figure(figsize=(5,5))
#     plt.imshow(img_rgb)
#     plt.title(os.path.basename(img_path))
#     plt.axis("off")
#     plt.show() 

from encryption import encrypt_image
from decryption import decrypt_image

# Example use
encrypt_image("input.png", "encrypted.png", x0=0.123456, r=3.99)
decrypt_image("encrypted.png", "decrypted.png", x0=0.123456, r=3.99)
