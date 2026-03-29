import numpy as np
from collections import Counter


# ---------------------------------
# 🔹 Entropy
# ---------------------------------
def calculate_entropy(image):
    pixels = image.flatten()
    counter = Counter(pixels)
    total = len(pixels)

    entropy = 0
    for count in counter.values():
        p = count / total
        entropy -= p * np.log2(p)

    return entropy


# ---------------------------------
# 🔹 CORRELATION (IEEE STANDARD)
# ---------------------------------
def calculate_correlation(image, num_samples=5000):
    h, w = image.shape

    x_h, y_h = [], []
    x_v, y_v = [], []
    x_d, y_d = [], []

    for _ in range(num_samples):
        i = np.random.randint(0, h - 1)
        j = np.random.randint(0, w - 1)

        x_h.append(image[i, j])
        y_h.append(image[i, j + 1])

        x_v.append(image[i, j])
        y_v.append(image[i + 1, j])

        x_d.append(image[i, j])
        y_d.append(image[i + 1, j + 1])

    corr_h = np.corrcoef(x_h, y_h)[0, 1]
    corr_v = np.corrcoef(x_v, y_v)[0, 1]
    corr_d = np.corrcoef(x_d, y_d)[0, 1]

    return corr_h, corr_v, corr_d


# ---------------------------------
# 🔹 NPCR & UACI
# ---------------------------------
def npcr_uaci(img1, img2):
    img1 = img1.astype(np.int16)
    img2 = img2.astype(np.int16)

    diff = img1 != img2
    npcr = np.sum(diff) / diff.size * 100

    uaci = np.sum(np.abs(img1 - img2)) / (255 * diff.size) * 100

    return npcr, uaci


# ---------------------------------
# 🔹 HISTOGRAM (SAVE ONLY)
# ---------------------------------
def save_histogram(image, path):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt

    plt.figure()
    plt.hist(image.flatten(), bins=256)
    plt.title("Encrypted Image Histogram")
    plt.savefig(path)
    plt.close()