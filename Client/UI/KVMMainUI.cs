using Keyroll.KVM;
using System;
using System.IO;
using System.Text;
using System.Windows.Forms;

namespace Keyroll
{
    public partial class KVMMainUI : Sartrey.UI.WinForms.View
    {
        private Memory _Model = null;

        public Memory Model 
        {
            get { return _Model; }
            set 
            {
                _Model = value;
                if(_Model != null)
                    LoadModel();
            }
        }

        public Control SubView 
        {
            get 
            {
                if (MainPanel.Controls.Count > 0)
                    return MainPanel.Controls[0];
                return null;
            }
        }

        public KVMMainUI()
        {
            InitializeComponent();
        }

        private void LoadModel() 
        {
            TrvKVM.Nodes.Clear();
            var root_node = new TreeNode("Memory");
            TrvKVM.Nodes.Add(root_node);
            if (_Model == null)
                return;
            foreach (var domain in _Model.Domains) 
            {
                var domain_node = new TreeNode();
                domain_node.Tag = domain.Name;
                domain_node.Text = domain.Name;
                foreach (var record in domain.Records) 
                {
                    var record_node = new TreeNode();
                    record_node.Tag = record.Key;
                    record_node.Text = record.Key;
                    domain_node.Nodes.Add(record_node);
                }
                root_node.Nodes.Add(domain_node);
            }
            TrvKVM.Nodes[0].Expand();
        }

        private void TrvKVM_AfterSelect(object sender, TreeViewEventArgs e)
        {
            var node = TrvKVM.SelectedNode;
            if (node == null)
                return;
            var view = SubView;
            if (view != null)
            {
                view.Dispose();
                MainPanel.Controls.Clear();
            }
            if (node.Level == 0)
            {
                var ui = new KVMMemoryUI();
                ui.Model = _Model;
                view = ui;
            }
            else if (node.Level == 1)
            {
                var ui = new KVMDomainUI();
                ui.Model = _Model[(string)node.Tag];
                view = ui;
            }
            else if (node.Level == 2)
            {
                var ui = new KVMRecordUI();
                ui.Model = _Model[(string)node.Parent.Tag][(string)node.Tag];
                view = ui;
            }
            view.Dock = DockStyle.Fill;
            MainPanel.Controls.Add(view);
        }

        private void BtnAddDomain_Click(object sender, EventArgs e)
        {
            var node = TrvKVM.SelectedNode;
            if (node == null)
                return;
            if (node.Level > 1)
                return;
            var domain = new Domain();
            domain.Name = Guid.NewGuid().ToString("N");
            _Model.Domains.Add(domain);
            var new_node = new TreeNode();
            new_node.Tag = domain.Name;
            new_node.Text = domain.Name;
            if (node.Level == 0)
                node.Nodes.Add(new_node);
            else
                node.Parent.Nodes.Add(new_node);
            LoadModel();
        }

        private void BtnRemoveDomain_Click(object sender, EventArgs e)
        {
            var node = TrvKVM.SelectedNode;
            if (node == null)
                return;
            if (node.Level != 1)
                return;
            var domain = _Model[(string)node.Tag];
            _Model.Domains.Remove(domain);
            LoadModel();
        }

        private void BtnAddRecord_Click(object sender, EventArgs e)
        {
            var node = TrvKVM.SelectedNode;
            if (node == null)
                return;
            if (node.Level == 0)
                return;
            
            var domain_node = (node.Level == 1 ? node : node.Parent);
            var domain = _Model[(string)domain_node.Tag];
            var record = new Record();
            record.Key = Guid.NewGuid().ToString("N");
            domain.Records.Add(record);
            
            var new_node = new TreeNode();
            new_node.Tag = record.Key;
            new_node.Text = record.Key;
            if (node.Level == 1)
                node.Nodes.Add(new_node);
            else
                node.Parent.Nodes.Add(new_node);
            LoadModel();
            new_node.Parent.Expand();
        }

        private void BtnRemoveRecord_Click(object sender, EventArgs e)
        {
            var node = TrvKVM.SelectedNode;
            if (node == null)
                return;
            if (node.Level != 2)
                return;
            var domain = _Model[(string)node.Parent.Tag];
            var record = domain[(string)node.Tag];
            domain.Records.Remove(record);
            LoadModel();
        }

        private void BtnRefresh_Click(object sender, EventArgs e)
        {
            LoadModel();
        }
    }
}
