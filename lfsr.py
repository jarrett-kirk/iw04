#!/usr/bin/env python

#-----------------------------------------------------------------------
# lfsr.py
# Author: Jarrett Kirk
#-----------------------------------------------------------------------

import sys
import numpy as np
from pylfsr import LFSR

#-----------------------------------------------------------------------

def main():
    state = []
    for arg in sys.argv[1:]:
        state.append(int(arg))
    fpoly = [3,2]
    print(state)
    print(fpoly)
    L = LFSR(initstate=state,fpoly=fpoly)
    print('count \t state \t\toutbit \t seq')
    print('-'*50)
    for _ in range(15):
        print(L.count,L.state,'',L.outbit,L.seq,sep='\t')
        L.next()

#-----------------------------------------------------------------------
    
if __name__ == '__main__':
    main()