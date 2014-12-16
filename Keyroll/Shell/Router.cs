using System.Collections.Generic;

namespace Keyroll.Shell
{
    public class Router
    {
        private List<IShell> _Shells
            = new List<IShell>();

        public IEnumerable<IShell> Query(string mime) 
        {
            foreach (var shell in _Shells)
                if (shell.Support(mime))
                    yield return shell;
        }

        public void Add(IShell shell) 
        {
            if (!_Shells.Contains(shell))
                _Shells.Add(shell);
        }

        public void RemoveProvider(IShell shell) 
        {
            if (_Shells.Contains(shell))
                _Shells.Remove(shell);
        }
    }
}
